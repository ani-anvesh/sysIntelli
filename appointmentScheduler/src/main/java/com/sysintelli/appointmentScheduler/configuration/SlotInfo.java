package com.sysintelli.appointmentScheduler.configuration;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SlotInfo {
    private LocalDate date;
    private Long availableSlots;
    private String shiftTiming;
    private String startTime;
    private String endTime;
}
