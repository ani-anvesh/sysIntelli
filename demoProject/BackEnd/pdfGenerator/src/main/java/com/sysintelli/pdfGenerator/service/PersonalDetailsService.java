package com.sysintelli.pdfGenerator.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sysintelli.pdfGenerator.helper.Helper;
import com.sysintelli.pdfGenerator.model.PersonalDetails;
import com.sysintelli.pdfGenerator.repository.PersonalDetailsRepository;

@Service
public class PersonalDetailsService {
	
	@Autowired
	private PersonalDetailsRepository personalDetailsRepository;
	
	public void save(MultipartFile file) {
		
		try {
			List<PersonalDetails> PersonalDetails=Helper.convertExcelToListOfPersonalDetails(file.getInputStream());
			this.personalDetailsRepository.saveAll(PersonalDetails);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	public List<PersonalDetails> getAllPersonalDetails(){
		
		return this.personalDetailsRepository.findAll();
		
	}

}
