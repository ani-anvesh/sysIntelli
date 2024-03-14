package com.sysintelli.appointmentScheduler.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sysintelli.appointmentScheduler.model.Doctor;
import com.sysintelli.appointmentScheduler.model.Schedule;
import com.sysintelli.appointmentScheduler.model.Slot;

import jakarta.transaction.Transactional;
@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long>{
	 List<Schedule> findByDoctorDoctorIdAndDateAndShiftShiftTiming(Long doctorId, LocalDate date, String shiftTiming);

	List<Schedule> findByDoctorDoctorIdAndDate(Long doctorId, LocalDate date);

	 @Query("SELECT s.scheduleId FROM Schedule s WHERE s.date = :date " +
	           "AND s.dayOfWeek = :dayOfWeek AND s.shift.shiftId = :shiftId " +
	           "AND s.doctor.doctorId = :doctorId")
	   Optional<Long>  findScheduleIdByCriteria(@Param("date") LocalDate date,
	                                  @Param("dayOfWeek") String dayOfWeek,
	                                  @Param("shiftId") Long shiftId,
	                                  @Param("doctorId") Long doctorId);
	 @Query("SELECT s.id FROM Schedule s WHERE s.date = :date AND s.dayOfWeek = :dayOfWeek AND s.shift.shiftId = :shiftId AND s.doctor.doctorId = :doctorId")
	    Long findScheduleIdByCriteria1(@Param("date") LocalDate date,
	                                  @Param("dayOfWeek") String dayOfWeek,
	                                  @Param("shiftId") Long shiftId,
	                                  @Param("doctorId") Long doctorId);
	 
	Schedule findScheduleByDoctorDoctorIdAndDateAndShiftShiftId(Long doctorId, LocalDate date, Long shiftId);
	
    @Transactional
    @Modifying
    @Query("UPDATE Schedule s SET s.availableSlots = s.availableSlots - 1 WHERE s.scheduleId = :scheduleId AND s.availableSlots > 0")
    int decrementAvailableSlots(@Param("scheduleId") Long scheduleId);
    
}

