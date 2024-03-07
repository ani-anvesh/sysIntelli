package com.sysintelli.appointmentScheduler.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sysintelli.appointmentScheduler.model.Schedule;
import com.sysintelli.appointmentScheduler.model.Slot;
@Repository
public interface SlotRepository extends JpaRepository<Slot, Long> {
	 @Query("SELECT DISTINCT s.schedule.date FROM Slot s WHERE s.schedule.doctor.doctorId = :doctorId " +
	            "AND s.schedule.date BETWEEN :startDate AND :endDate " +
	            "AND s.availability NOT IN ('booked', 'canceled')")
	    List<LocalDate> findAvailableDatesForDoctorThisWeek(@Param("doctorId") Long doctorId,
	                                                        @Param("startDate") LocalDate startDate,
	                                                        @Param("endDate") LocalDate endDate);
	 

	List<Slot> findSlotsBySchedule(Schedule schedule);

}
