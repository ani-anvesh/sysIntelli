package com.sysintelli.pdfGenerator.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sysintelli.pdfGenerator.helper.Helper;
import com.sysintelli.pdfGenerator.model.PersonalDetails;
import com.sysintelli.pdfGenerator.service.PersonalDetailsService;

@RestController
@CrossOrigin("*")
public class PersonalDetailsController {
	
	@Autowired
	private PersonalDetailsService personalDetailsService;
	
	@PostMapping("/personaldetails/upload")
	public ResponseEntity<?> upload(@RequestParam("file") MultipartFile file){
		if(Helper.checkExcelFormat(file)) {
			//true
			
			this.personalDetailsService.save(file);
			
			return ResponseEntity.ok(Map.of("message", "File is uploaded and data is saved to db"));
			
			
			
		}else {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("please upload excel file only");
		}
	}
	
	@GetMapping("/personaldetails")
	public List<PersonalDetails> getAllPersonalDetails(){
		
		return this.personalDetailsService.getAllPersonalDetails();
	}

}
