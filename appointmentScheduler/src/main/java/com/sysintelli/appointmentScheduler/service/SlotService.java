//package com.sysintelli.appointmentScheduler.service;
//
//
//import java.time.LocalDate;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Optional;
//
//import org.springframework.stereotype.Service;
//
//import com.sysintelli.appointmentScheduler.configuration.SlotTimeInfo;
//import com.sysintelli.appointmentScheduler.model.Schedule;
//import com.sysintelli.appointmentScheduler.repository.ScheduleRepository;
//
//@Service
//public class SlotService {
//
//
//
//    // Method to fetch SlotTimeInfo based on doctor ID, date, and shift ID
//    public List<SlotTimeInfo> getSlotTimeInfoForDoctor(Long doctorId, LocalDate date, Long shiftId) {
//        List<SlotTimeInfo> slotTimeInfos = new ArrayList<>();
//
//        // Assuming you have a method to fetch schedules by doctor ID, date, and shift ID
//       Long scheduleId= findScheduleIdByDoctorIdAndDateAndShiftId(doctorId, date, shiftId);
//        
//
//        for (Schedule schedule : schedules) {
//            // Get the Slot associated with the schedule
//            Slot slot = schedule.getSlot();
//
//            // Get the SlotTiming associated with the Slot
//            SlotTiming slotTiming = slot.getSlotTiming();
//
//            // Create SlotTimeInfo object
//            SlotTimeInfo slotTimeInfo = new SlotTimeInfo();
//            slotTimeInfo.setSlotName(slotTiming.getSlotName());
//            slotTimeInfo.setStartTime(slotTiming.getStartTime());
//            slotTimeInfo.setEndTime(slotTiming.getEndTime());
//            slotTimeInfo.setAvailability(slot.getAvailability()); // Get availability from Slot entity
//
//            // Add SlotTimeInfo to the list
//            slotTimeInfos.add(slotTimeInfo);
//        }
//
//        return slotTimeInfos;
//    }
//
//	private Long findScheduleIdByDoctorIdAndDateAndShiftId(Long doctorId, LocalDate date, Long shiftId) {
//		// TODO Auto-generated method stub
//		return null;
//	}
//}
//
////}
