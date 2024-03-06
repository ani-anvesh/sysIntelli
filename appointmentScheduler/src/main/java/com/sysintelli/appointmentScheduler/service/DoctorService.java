package com.sysintelli.appointmentScheduler.service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sysintelli.appointmentScheduler.configuration.SlotInfo;
import com.sysintelli.appointmentScheduler.model.Doctor;
import com.sysintelli.appointmentScheduler.model.Schedule;
import com.sysintelli.appointmentScheduler.model.Shift;
import com.sysintelli.appointmentScheduler.model.WeeklySchedule;
import com.sysintelli.appointmentScheduler.repository.DoctorRepository;
import com.sysintelli.appointmentScheduler.repository.ScheduleRepository;
import com.sysintelli.appointmentScheduler.repository.WeeklyScheduleRepository;

@Service
public class DoctorService {
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private WeeklyScheduleRepository weeklyScheduleRepository;
    @Autowired
    private ScheduleRepository scheduleRepository;

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public List<SlotInfo> getTotalAvailableSlotsByDay(Long doctorId, LocalDate startDate, LocalDate endDate) {
        List<SlotInfo> slotInfoList = new ArrayList<>();

        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            List<SlotInfo> slotsForDate = getSlotsForDate(doctorId, date);
            slotInfoList.addAll(slotsForDate);
        }

        return slotInfoList;
    }

    private List<SlotInfo> getSlotsForDate(Long doctorId, LocalDate date) {
        List<SlotInfo> slotsForDate = new ArrayList<>();

        // Check if the date is before today
        if (date.isBefore(LocalDate.now())) {
            // If so, return slots with zero availability
            slotsForDate.add(new SlotInfo((long) 0,date, (long) 0, "", "", ""));
            return slotsForDate;
        }

        // Retrieve all schedules for the doctor for the given date
        List<Schedule> schedules = scheduleRepository.findByDoctorDoctorIdAndDate(doctorId, date);

        // Check if morning, afternoon, and evening are present in the schedule
        boolean hasMorningSchedule = schedules.stream().anyMatch(schedule -> schedule.getShift().getShiftTiming().equalsIgnoreCase("Morning"));
        boolean hasAfternoonSchedule = schedules.stream().anyMatch(schedule -> schedule.getShift().getShiftTiming().equalsIgnoreCase("Afternoon"));
        boolean hasEveningSchedule = schedules.stream().anyMatch(schedule -> schedule.getShift().getShiftTiming().equalsIgnoreCase("Evening"));

        if (!hasMorningSchedule && (hasAfternoonSchedule || hasEveningSchedule)) {
            // Fetch morning slots from weekly schedule
            List<WeeklySchedule> morningWeeklySchedules = weeklyScheduleRepository.findByDoctorDoctorIdAndDayOfWeekAndShiftShiftTiming(doctorId, date.getDayOfWeek().toString(), "Morning");
            slotsForDate.addAll(morningWeeklySchedules.stream().map(ws -> createSlotInfoFromWeeklySchedule(ws, date)).collect(Collectors.toList()));
        } else {
            // Include morning slots from the schedule
            slotsForDate.addAll(getSlotsFromSchedule(doctorId, date, "Morning"));
        }

        if (!hasAfternoonSchedule && (hasMorningSchedule || hasEveningSchedule)) {
            // Fetch afternoon slots from weekly schedule
            List<WeeklySchedule> afternoonWeeklySchedules = weeklyScheduleRepository.findByDoctorDoctorIdAndDayOfWeekAndShiftShiftTiming(doctorId, date.getDayOfWeek().toString(), "Afternoon");
            slotsForDate.addAll(afternoonWeeklySchedules.stream().map(ws -> createSlotInfoFromWeeklySchedule(ws, date)).collect(Collectors.toList()));
        } else {
            // Include afternoon slots from the schedule
            slotsForDate.addAll(getSlotsFromSchedule(doctorId, date, "Afternoon"));
        }

        if (!hasEveningSchedule && (hasMorningSchedule || hasAfternoonSchedule)) {
            // Fetch evening slots from weekly schedule
            List<WeeklySchedule> eveningWeeklySchedules = weeklyScheduleRepository.findByDoctorDoctorIdAndDayOfWeekAndShiftShiftTiming(doctorId, date.getDayOfWeek().toString(), "Evening");
            slotsForDate.addAll(eveningWeeklySchedules.stream().map(ws -> createSlotInfoFromWeeklySchedule(ws, date)).collect(Collectors.toList()));
        } else {
            // Include evening slots from the schedule
            slotsForDate.addAll(getSlotsFromSchedule(doctorId, date, "Evening"));
        }

        // Retrieve days from the WeeklySchedule table where slots are not available in the Schedule table
        List<DayOfWeek> daysWithoutSlotsInSchedule = getDaysWithoutSlotsInSchedule(doctorId, date);
        slotsForDate.addAll(getSlotsFromWeeklyScheduleWithoutSchedule(doctorId, daysWithoutSlotsInSchedule, date));

        return slotsForDate;
    }

    private List<SlotInfo> getSlotsFromSchedule(Long doctorId, LocalDate date, String shiftTiming) {
        // Retrieve slots from the schedule for the specified shiftTiming
        List<Schedule> scheduleSlots = scheduleRepository.findByDoctorDoctorIdAndDateAndShiftShiftTiming(doctorId, date, shiftTiming);
        return scheduleSlots.stream().map(this::createSlotInfoFromSchedule).collect(Collectors.toList());
    }


    private List<DayOfWeek> getDaysWithoutSlotsInSchedule(Long doctorId, LocalDate date) {
        List<DayOfWeek> daysWithoutSlots = new ArrayList<>();
        DayOfWeek dayOfWeek = date.getDayOfWeek();
        List<Schedule> schedules = scheduleRepository.findByDoctorDoctorIdAndDate(doctorId, date);

        if (schedules.isEmpty()) {
            daysWithoutSlots.add(dayOfWeek);
        }

        return daysWithoutSlots;
    }

    private List<SlotInfo> getSlotsFromWeeklyScheduleWithoutSchedule(Long doctorId, List<DayOfWeek> daysWithoutSlots, LocalDate date) {
        List<SlotInfo> slotsForDate = new ArrayList<>();

        for (DayOfWeek day : daysWithoutSlots) {
            List<WeeklySchedule> weeklySchedules = weeklyScheduleRepository.findByDoctorDoctorIdAndDayOfWeek(doctorId, day.toString());
            slotsForDate.addAll(weeklySchedules.stream().map(ws -> createSlotInfoFromWeeklySchedule(ws, date)).collect(Collectors.toList()));
        }

        return slotsForDate;
    }


    private SlotInfo createSlotInfoFromSchedule(Schedule schedule) {
        Shift shift = schedule.getShift();
        return new SlotInfo(shift.getShiftId(), schedule.getDate(), schedule.getAvailableSlots(), shift.getShiftTiming(), shift.getStartTime(), shift.getEndTime());
    }

    private SlotInfo createSlotInfoFromWeeklySchedule(WeeklySchedule weeklySchedule, LocalDate date) {
        Shift shift = weeklySchedule.getShift();
        return new SlotInfo(shift.getShiftId(), date.with(TemporalAdjusters.nextOrSame(DayOfWeek.valueOf(weeklySchedule.getDayOfWeek().toUpperCase()))), 
                            weeklySchedule.getAvailableSlots(), shift.getShiftTiming(), shift.getStartTime(), shift.getEndTime());
    }

}
