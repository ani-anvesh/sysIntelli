package com.sysintelli.appointmentScheduler.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sysintelli.appointmentScheduler.model.WeeklySchedule;
@Repository
public interface WeeklyScheduleRepository extends JpaRepository<WeeklySchedule, Long>{
	 List<WeeklySchedule> findByDoctorDoctorIdAndDayOfWeekAndShiftShiftTiming(Long doctorId, String dayOfWeek, String shiftTiming);

	List<WeeklySchedule> findByDoctorDoctorIdAndDayOfWeek(Long doctorId, String string);

}
