	package com.sysintelli.appointmentScheduler.service;
	
	import java.time.LocalDate;
	import java.time.LocalDateTime;
	import java.util.List;
	
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.scheduling.annotation.Scheduled;
	import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
	
	import com.sysintelli.appointmentScheduler.model.TempData;
	import com.sysintelli.appointmentScheduler.repository.TempDataRepository;
	
	@Service
	public class TempDataService {
		@Autowired
		private TempDataRepository tempDataRepository;
		public String addTempData(Long doctorId, Long patientId,LocalDate date,String dayOfWeek,Long shiftId,String slotName) {
			TempData tempData= new TempData();
			tempData.setCreationTime(LocalDateTime.now());
			tempData.setDate(date);
			tempData.setDayOfWeek(dayOfWeek);
			tempData.setDoctorId(doctorId);
			tempData.setPatientId(patientId);
			tempData.setShiftId(shiftId);
			tempData.setSlotName(slotName);
			tempDataRepository.save(tempData);
			return "Temp data is locked";
		}
		
		@Scheduled(fixedRate = 300000)
		@Transactional(propagation = Propagation.REQUIRES_NEW)
	    public void deleteOldTempData() {
	        LocalDateTime threshold = LocalDateTime.now().minusMinutes(5);
	        tempDataRepository.deleteByCreationTimeBefore(threshold);
	    }
	
		public List<TempData> getAllTempData() {
			return tempDataRepository.findAll();
		}
	
	}
