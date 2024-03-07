package com.sysintelli.appointmentScheduler.configuration;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SlotTimeInfo {
	private String slotName;
	private String availability;
	private String startTime;
	private String endTime;

}
