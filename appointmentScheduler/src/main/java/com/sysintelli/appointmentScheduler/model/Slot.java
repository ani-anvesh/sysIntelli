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
public class Slot {
	@Id
	private Long slotId;
	@ManyToOne
	@JoinColumn(name="scheduleId",referencedColumnName = "scheduleId")
	private Schedule schedule;
	@ManyToOne
	@JoinColumn(name="slotName",referencedColumnName = "slotName")
	private SlotTiming slotTiming;
	private String availability;

}
