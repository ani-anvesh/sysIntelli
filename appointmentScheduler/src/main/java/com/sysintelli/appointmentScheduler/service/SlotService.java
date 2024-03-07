package com.sysintelli.appointmentScheduler.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sysintelli.appointmentScheduler.configuration.SlotTimeInfo;
import com.sysintelli.appointmentScheduler.model.Schedule;
import com.sysintelli.appointmentScheduler.model.Slot;
import com.sysintelli.appointmentScheduler.model.SlotTiming;
import com.sysintelli.appointmentScheduler.repository.ScheduleRepository;
import com.sysintelli.appointmentScheduler.repository.SlotRepository;
import com.sysintelli.appointmentScheduler.repository.SlotTimingRepository;

@Service
public class SlotService {
    @Autowired
    private ScheduleRepository scheduleRepository;
    @Autowired
    private SlotRepository slotRepository;
    @Autowired
    private SlotTimingRepository slotTimingRepository;

    public List<SlotTimeInfo> getSlotTimeInfoForDoctor(Long doctorId, LocalDate date, Long shiftId) {
        List<SlotTimeInfo> slotTimeInfos = new ArrayList<>();
        
        // Find schedule for the given doctor, date, and shift
        Schedule schedule = scheduleRepository.findScheduleByDoctorDoctorIdAndDateAndShiftId(doctorId, date, shiftId);
        if (schedule != null) {
            // Retrieve slots associated with the schedule
            List<Slot> slots = slotRepository.findSlotsBySchedule(schedule);
            // Convert slots into SlotTimeInfo objects
            for (Slot slot : slots) {
                SlotTiming slotTiming = slot.getSlotTiming();
                SlotTimeInfo slotTimeInfo = new SlotTimeInfo();
                slotTimeInfo.setSlotName(slotTiming.getSlotName());
                slotTimeInfo.setAvailability(slot.getAvailability());
                slotTimeInfo.setStartTime(slotTiming.getStartTime());
                slotTimeInfo.setEndTime(slotTiming.getEndTime());
                slotTimeInfos.add(slotTimeInfo);
            }
        }
        return slotTimeInfos;
    }

}
