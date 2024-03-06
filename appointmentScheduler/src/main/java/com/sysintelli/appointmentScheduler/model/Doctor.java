package com.sysintelli.appointmentScheduler.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Doctor {
	@Id
	private Long doctorId;
	private String name;
	private String specialization;
	private String contactInfo;

}
