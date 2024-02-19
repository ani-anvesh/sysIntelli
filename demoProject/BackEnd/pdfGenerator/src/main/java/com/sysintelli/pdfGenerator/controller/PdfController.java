package com.sysintelli.pdfGenerator.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import com.sysintelli.pdfGenerator.service.PdfService;

@RestController
public class PdfController {

	private final PdfService pdfService;

	@Autowired
	public PdfController(PdfService pdfService) {
		this.pdfService = pdfService;
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
}