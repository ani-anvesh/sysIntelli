package com.sysintelli.appointmentScheduler.service;

import java.time.LocalDate;
import java.util.Optional;

import org.hibernate.internal.build.AllowSysOut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sysintelli.appointmentScheduler.model.Appointment;
import com.sysintelli.appointmentScheduler.model.Schedule;
import com.sysintelli.appointmentScheduler.model.Slot;
import com.sysintelli.appointmentScheduler.repository.AppointmentRepository;
import com.sysintelli.appointmentScheduler.repository.ScheduleRepository;
import com.sysintelli.appointmentScheduler.repository.SlotRepository;

@Service
public class AppointmentService {
	@Autowired
	AppointmentRepository appointmentRepository;
	@Autowired
	ScheduleRepository scheduleRepository;
	@Autowired
	SlotRepository slotRepository;
	public String setAppointment(Long doctorId, Long patientId, LocalDate date, String dayOfWeek,Long shiftId,String slotName) {
		Appointment appointment=new Appointment();
		appointment.setDate(date);
		appointment.setTimeSlot(slotName);
		appointment.setStatus("booked");
		appointment.setDoctor(doctorId);
		appointment.setPatient(patientId);
		appointmentRepository.save(appointment);
		Optional<Long> scheduleIdOptional = scheduleRepository.findScheduleIdByCriteria(date, dayOfWeek, shiftId, doctorId);
		Long scheduleId;
	    if (scheduleIdOptional.isPresent()) {
	        scheduleId = scheduleIdOptional.get();
	        scheduleRepository.decrementAvailableSlots(scheduleId);
        } else {
            Schedule schedule= new Schedule();
            schedule.setAvailableSlots(11L);
            schedule.setDate(date);
            schedule.setDayOfWeek(dayOfWeek);
            schedule.setDoctor(doctorId);
            schedule.setShift(shiftId);
            scheduleRepository.save(schedule);
  
        }
	    long scheduleId1=scheduleRepository.findScheduleIdByCriteria1(date, dayOfWeek, shiftId, doctorId);
        System.out.println(scheduleId1);
		Slot slot = new Slot();
		slot.setAvailability("booked");
		slot.setSchedule(scheduleId1);
		slot.setSlotTiming(slotName);
		 slotRepository.save(slot);

		
		
		return "Appoitment Created";
	}
}
