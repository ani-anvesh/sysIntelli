package com.sysintelli.appointmentScheduler.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sysintelli.appointmentScheduler.model.Shift;
@Repository
public interface ShiftRepository extends JpaRepository<Shift, Long>{

}
