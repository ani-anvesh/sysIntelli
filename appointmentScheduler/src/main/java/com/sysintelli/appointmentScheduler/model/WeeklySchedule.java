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
public class WeeklySchedule {
	@Id
	private Long weeklyScheduleId;
	@ManyToOne
	@JoinColumn(name = "doctorId",referencedColumnName = "doctorId")
	private Doctor doctor;

	@ManyToOne
	@JoinColumn(name = "shiftId",referencedColumnName = "shiftId")
	private Shift shift;
	private String dayOfWeek;
	private Long availableSlots;

}
