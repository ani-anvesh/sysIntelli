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
public class Shift {
	@Id
	private Long shiftId;
	private String shiftTiming;
	private String startTime;
	private String EndTime;

}
