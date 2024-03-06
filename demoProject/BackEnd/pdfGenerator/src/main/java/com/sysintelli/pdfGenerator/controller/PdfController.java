package com.sysintelli.pdfGenerator.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sysintelli.pdfGenerator.model.User;
import com.sysintelli.pdfGenerator.service.JwtService;
import com.sysintelli.pdfGenerator.service.PdfService;

@RestController
public class PdfController {

    private final PdfService pdfService;
    
    @Autowired
    JwtService jwtService;

    @Autowired
    public PdfController(PdfService pdfService) {
        this.pdfService = pdfService;
    }
    @GetMapping("/login")
    public ResponseEntity<String> login(@RequestBody User userDetails) {
    	String token = jwtService.generateToken(userDetails);
    	HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.add("Authorization", "Bearer "+ token);
    	//System.out.println(token);
    	
    	System.out.println(jwtService.extractUserName(token));
    	return new ResponseEntity<>(token,headers, HttpStatus.OK);
    	
    }

    @GetMapping("/generate-pdf/{personId}/{vistId}")
    public ResponseEntity<byte[]> generatePdf(@PathVariable Integer personId, @PathVariable Integer vistId) {

        
        try {
            byte[] pdfBytes = pdfService.generatePdf(personId, vistId);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            //headers.setContentDispositionFormData("filename", "generated-pdf.pdf");
            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return new ResponseEntity<>("Please select a file to upload", HttpStatus.BAD_REQUEST);
        }
        try {
            pdfService.parseExcelFile(file);
            return new ResponseEntity<>("File uploaded and data saved successfully", HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>("Error occurred while processing the file", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}