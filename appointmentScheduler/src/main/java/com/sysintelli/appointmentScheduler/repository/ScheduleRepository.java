package com.sysintelli.appointmentScheduler.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sysintelli.appointmentScheduler.model.Doctor;
import com.sysintelli.appointmentScheduler.model.Schedule;
import com.sysintelli.appointmentScheduler.model.Slot;
@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long>{
	 List<Schedule> findByDoctorDoctorIdAndDateAndShiftShiftTiming(Long doctorId, LocalDate date, String shiftTiming);

	List<Schedule> findByDoctorDoctorIdAndDate(Long doctorId, LocalDate date);

	//Optional<Long> findScheduleIdByDoctorIdAndDateAndShiftId(Long doctorId, LocalDate date, Long shiftId);
}
