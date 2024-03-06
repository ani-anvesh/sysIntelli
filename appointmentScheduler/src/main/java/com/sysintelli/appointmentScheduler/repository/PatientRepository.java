package com.sysintelli.appointmentScheduler.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sysintelli.appointmentScheduler.model.Patient;
@Repository
public interface PatientRepository extends JpaRepository<Patient, Long>{

}
