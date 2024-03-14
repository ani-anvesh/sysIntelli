package com.sysintelli.appointmentScheduler.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Appointment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long appointmentId;
	@ManyToOne
	@JoinColumn(name = "doctorId",referencedColumnName = "doctorId")
	private Doctor doctor;
	@ManyToOne
	@JoinColumn(name = "patientId",referencedColumnName = "patientId")
	private Patient patient;
	private LocalDate Date;
	private String timeSlot;
	private String status;
	public void setDoctor(Long doctorId) {
        Doctor doctor = new Doctor();
        doctor.setDoctorId(doctorId);
        this.doctor = doctor;
    }
	public void setPatient(Long patientId) {
        // Create a new Patient object with the provided ID
        Patient patient = new Patient();
        patient.setPatientId(patientId);
        // Set the patient
        this.patient = patient;
    }
}
