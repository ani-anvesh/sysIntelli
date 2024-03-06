package com.sysintelli.pdfGenerator;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.boot.test.context.SpringBootTest;
import com.sysintelli.pdfGenerator.model.PersonVisit;
import com.sysintelli.pdfGenerator.model.PersonalDetails;
import com.sysintelli.pdfGenerator.repository.PersonVisitRepository;
import com.sysintelli.pdfGenerator.repository.PersonalDetailsRepository;
import com.sysintelli.pdfGenerator.service.PdfService;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
class PdfGeneratorApplicationTests {

	@Mock
    private PersonVisitRepository personVisitRepository;

    @Mock
    private PersonalDetailsRepository personalDetailsRepository;

    @InjectMocks
    private PdfService pdfService;

    @Test
    void testParseExcelFile() throws IOException {
        
        MockMultipartFile file = new MockMultipartFile("file", "test.xlsx", "application/vnd.ms-excel",
                "testdata".getBytes());

        
        PersonalDetails personalDetails = new PersonalDetails();
        personalDetails.setPersonId(1);
        personalDetails.setPersonName("John Doe");
        personalDetails.setGender("Male");
        personalDetails.setDob("1990-01-01");
        personalDetails.setAddress("123 Main St");

        PersonVisit personVisit = new PersonVisit();
        personVisit.setVistId(1);
        personVisit.setPersonalDetails(personalDetails);

        List<PersonalDetails> personalDetailsList = Arrays.asList(personalDetails);
        List<PersonVisit> personVisitList = Arrays.asList(personVisit);

       
        when(personVisitRepository.saveAll(any())).thenReturn(personVisitList);
        when(personalDetailsRepository.saveAll(any())).thenReturn(personalDetailsList);

       
        pdfService.parseExcelFile(file);

        
        verify(personVisitRepository, times(1)).saveAll(any());
        verify(personalDetailsRepository, times(1)).saveAll(any());
    }

//    @Test
//    void testGeneratePdf() throws IOException {
//        // Define test data
//        int personId = 1;
//        int visitId = 1;
//
//        // Mock data for repository method
//        Object[] details = { 1, "Test Visit Address", "Test Procedure", 1, 100, 0, "Test Referral", 1, 50, 0, 0 };
//        List<Object> detailsList = Arrays.asList(details);
//
//        PersonalDetails personalDetails = new PersonalDetails();
//        personalDetails.setPersonId(personId);
//        personalDetails.setPersonName("John Doe");
//        // Set other personal details
//
//        // Stub repository methods
//        when(personVisitRepository.findDetailsByPersonIdAndVisitId(personId, visitId)).thenReturn(detailsList);
//        when(personalDetailsRepository.findById(personId)).thenReturn(java.util.Optional.of(personalDetails));
//
//        // Call the method under test
//        byte[] pdfBytes = pdfService.generatePdf(personId, visitId);
//
//        // Assert that PDF bytes are not null
//        assertNotNull(pdfBytes);
//        // Add more assertions as needed
//    }

}
