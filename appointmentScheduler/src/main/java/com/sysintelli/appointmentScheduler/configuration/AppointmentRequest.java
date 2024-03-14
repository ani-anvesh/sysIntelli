package com.sysintelli.appointmentScheduler.configuration;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentRequest {
    private Long patientId;
    private LocalDate date;
    private String dayOfWeek;
    private Long shiftId;
    private String slotName;
}
