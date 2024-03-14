package com.sysintelli.appointmentScheduler.repository;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sysintelli.appointmentScheduler.model.TempData;
@Repository
public interface TempDataRepository extends JpaRepository<TempData, Long> {
	 void deleteByCreationTimeBefore(LocalDateTime threshold);

}
