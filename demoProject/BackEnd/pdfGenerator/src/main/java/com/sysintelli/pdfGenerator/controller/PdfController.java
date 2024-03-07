package com.sysintelli.pdfGenerator.controller;

import java.io.ByteArrayInputStream;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.itextpdf.io.source.ByteArrayOutputStream;
import com.sysintelli.pdfGenerator.model.User;
import com.sysintelli.pdfGenerator.service.JwtService;
import com.sysintelli.pdfGenerator.service.PdfService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class PdfController {
	private PdfService pdfService;
	
	 @GetMapping("/generate-pdf")
	    public ResponseEntity<byte[]> generatePdf() throws IOException {
	        byte[] pdfBytes = pdfService.generatePdf();
	        HttpHeaders headers = new HttpHeaders();
	        headers.setContentType(MediaType.APPLICATION_PDF);
	        headers.setContentDispositionFormData("filename", "generated-pdf.pdf");
	        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
	

	private final PdfService pdfService;
	private final AmazonS3 amazonS3Client;

	@Autowired
	JwtService jwtService;

	@Autowired
	public PdfController(PdfService pdfService, AmazonS3 amazonS3Client) {
		this.pdfService = pdfService;
		this.amazonS3Client = amazonS3Client;
	}

	@Value("${amazon.s3.bucketName}")
	private String bucketName;

	@GetMapping("/login")
	public ResponseEntity<String> login(@RequestBody User userDetails) {
		String token = jwtService.generateToken(userDetails);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.add("Authorization", "Bearer " + token);
		return new ResponseEntity<>("{\"token\": \"" + token + "\"}", headers, HttpStatus.OK);
	}

	@PostMapping("/upload-excel")
	public ResponseEntity<String> uploadExcelToDatabase(@RequestParam("file") MultipartFile file) {
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
	@GetMapping("/upload-download-pdf/{personId}/{vistId}")
	public ResponseEntity<byte[]> uploadPdfToS3AndDownloadFromS3(@PathVariable Integer personId,
			@PathVariable Integer vistId) {
//        if (file.isEmpty()) {
//            return new ResponseEntity<>("Please select a file to upload", HttpStatus.BAD_REQUEST);
//        }
		try {
			byte[] pdfBytes = pdfService.generatePdf(personId, vistId);
			String key = "generated-pdfs/" + personId + "-" + vistId + ".pdf";
			ByteArrayInputStream inputStream = new ByteArrayInputStream(pdfBytes);
			ObjectMetadata metadata = new ObjectMetadata();
			metadata.setContentType(MediaType.APPLICATION_PDF_VALUE);
			metadata.setContentLength(pdfBytes.length);
			amazonS3Client.putObject(new PutObjectRequest(bucketName, key, inputStream, metadata));

			
			S3Object s3Object = amazonS3Client.getObject(bucketName, key);
			byte[] downloadedPdfBytes;
			ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
			s3Object.getObjectContent().transferTo(outputStream);
			downloadedPdfBytes = outputStream.toByteArray();

			HttpHeaders headers = new HttpHeaders();
			headers.setContentType(MediaType.APPLICATION_PDF);
			headers.setContentDispositionFormData("filename", "generated-pdf.pdf");
			s3Object.getObjectContent().close();

			return new ResponseEntity<>(downloadedPdfBytes, headers, HttpStatus.OK);
		} catch (IOException e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

//    @GetMapping("/generate-pdf/{personId}/{vistId}")
//    public ResponseEntity<byte[]> generatePdf(@PathVariable Integer personId, @PathVariable Integer vistId) {
//
//        
//        try {
//            byte[] pdfBytes = pdfService.generatePdf(personId, vistId);
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.APPLICATION_PDF);
//            //headers.setContentDispositionFormData("filename", "generated-pdf.pdf");
//            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
//        } catch (IOException e) {
//            e.printStackTrace();
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    @PostMapping("/upload")
//    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
//        if (file.isEmpty()) {
//            return new ResponseEntity<>("Please select a file to upload", HttpStatus.BAD_REQUEST);
//        }
//        try {
//            pdfService.parseExcelFile(file);
//            return new ResponseEntity<>("File uploaded and data saved successfully", HttpStatus.OK);
//        } catch (IOException e) {
//            return new ResponseEntity<>("Error occurred while processing the file", HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
}
