package com.sysintelli.pdfGenerator.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import com.sysintelli.pdfGenerator.service.PdfService;

@RestController
public class PdfController {
	private PdfService pdfService;
	
	 @GetMapping("/generate-pdf")
	    public ResponseEntity<byte[]> generatePdf() throws IOException {
	        byte[] pdfBytes = pdfService.generatePdf();
	        HttpHeaders headers = new HttpHeaders();
	        headers.setContentType(MediaType.APPLICATION_PDF);
	        headers.setContentDispositionFormData("filename", "generated-pdf.pdf");
	        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
	

}
}