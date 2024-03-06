package com.sysintelli.appointmentScheduler.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sysintelli.appointmentScheduler.model.Appointment;
@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long>{

}
