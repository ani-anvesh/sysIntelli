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
public class Schedule {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long scheduleId;
	@ManyToOne
	@JoinColumn(name = "doctorId",referencedColumnName = "doctorId")
	private Doctor doctor;

	@ManyToOne
	@JoinColumn(name = "shiftId",referencedColumnName = "shiftId")
	private Shift shift;
	private String dayOfWeek;
	private LocalDate date;
	private Long availableSlots;
	public void setDoctor(Long doctorId) {
        Doctor doctor = new Doctor();
        doctor.setDoctorId(doctorId);
        this.doctor = doctor;
    }
	public void setShift(Long shiftId) {
        Shift shift = new Shift();
        shift.setShiftId(shiftId);
        this.shift = shift;
    }

}
