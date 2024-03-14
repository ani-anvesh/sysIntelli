package com.sysintelli.appointmentScheduler.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sysintelli.appointmentScheduler.configuration.AppointmentRequest;
import com.sysintelli.appointmentScheduler.configuration.SlotInfo;
import com.sysintelli.appointmentScheduler.configuration.SlotTimeInfo;
import com.sysintelli.appointmentScheduler.model.Doctor;
import com.sysintelli.appointmentScheduler.model.SlotTiming;
import com.sysintelli.appointmentScheduler.model.TempData;
import com.sysintelli.appointmentScheduler.service.AppointmentService;
import com.sysintelli.appointmentScheduler.service.DoctorService;
import com.sysintelli.appointmentScheduler.service.SlotService;
import com.sysintelli.appointmentScheduler.service.TempDataService;
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
class DoctorController {
    @Autowired
    private DoctorService doctorService;
    
    @Autowired
    private SlotService slotService;
    
    @Autowired
    private AppointmentService appointmentService;
    
    @Autowired
    private TempDataService tempDataService;

    @GetMapping("/doctorsList")
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }
    @GetMapping("/slotTimingList")
    public List<SlotTiming> getSlotTimingList() {
        return slotService.getSlotTimingList();
    }

    @GetMapping("/{doctorId}/totalAvailableSlots")
    public ResponseEntity<List<SlotInfo>> getTotalAvailableSlotsByDay(
            @PathVariable Long doctorId,
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        List<SlotInfo> totalSlotsByDay = doctorService.getTotalAvailableSlotsByDay(doctorId, startDate, endDate);
        return ResponseEntity.ok(totalSlotsByDay);
    }
    @GetMapping("/{doctorId}/slotInfo")
    public ResponseEntity<List<SlotTimeInfo>> getSlotDetails(
            @PathVariable Long doctorId,
            @RequestParam LocalDate date,
            @RequestParam Long shiftId) {
        return slotService.getSlotTimeInfoForDoctor(doctorId, date, shiftId);
    }
    
    @PostMapping("/{doctorId}/appointments")
    public String createAppointment(@PathVariable Long doctorId, @RequestBody AppointmentRequest appointmentRequest) {
        Long patientId = appointmentRequest.getPatientId();
        LocalDate date = appointmentRequest.getDate();
        String dayOfWeek = appointmentRequest.getDayOfWeek();
        Long shiftId = appointmentRequest.getShiftId();
        String slotName = appointmentRequest.getSlotName();
        return appointmentService.setAppointment(doctorId, patientId, date, dayOfWeek, shiftId, slotName);
    }
    @PostMapping("/tempData")
    public String addTempData(@RequestBody TempData tempData) {
    	Long doctorId = tempData.getDoctorId();
    	Long patientId = tempData.getPatientId();
        LocalDate date = tempData.getDate();
        String dayOfWeek = tempData.getDayOfWeek();
        Long shiftId = tempData.getShiftId();
        String slotName = tempData.getSlotName(); 
        return tempDataService.addTempData(doctorId, patientId, date, dayOfWeek, shiftId, slotName);
    	
    }
    @GetMapping("/tempDataList")
    public List<TempData> getAllTempData() {
        return tempDataService.getAllTempData();
    }
    
}
