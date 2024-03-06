package com.sysintelli.pdfGenerator.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class PersonalDetails {
	@Id
	private int personId;
	private String personName;
	private String gender;
	private String dob;
	private String address;

}