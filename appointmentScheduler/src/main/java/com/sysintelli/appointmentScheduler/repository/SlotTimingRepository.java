package com.sysintelli.appointmentScheduler.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sysintelli.appointmentScheduler.model.SlotTiming;
@Repository
public interface SlotTimingRepository extends JpaRepository<SlotTiming, String> {

}
