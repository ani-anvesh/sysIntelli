package com.sysintelli.appointmentScheduler.model;

import jakarta.persistence.Entity;
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
	private Long appointmentId;
	@ManyToOne
	@JoinColumn(name = "doctorId",referencedColumnName = "doctorId")
	private Doctor doctor;
	@ManyToOne
	@JoinColumn(name = "patientId",referencedColumnName = "patientId")
	private Patient patient;
	private String Date;
	private String timeSlot;
	private String status;

}
