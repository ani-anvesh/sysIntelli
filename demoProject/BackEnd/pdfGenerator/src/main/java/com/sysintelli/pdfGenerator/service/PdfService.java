package com.sysintelli.pdfGenerator.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Table;
import com.sysintelli.pdfGenerator.repository.PersonVisitRepository;
import com.sysintelli.pdfGenerator.repository.PersonalDetailsRepository;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;


@Service
public class PdfService {
	@Autowired
	private PersonVisitRepository personVisitRepository;
	@Autowired
	private PersonalDetailsRepository personDetailsRepository;
	
	public byte[] generatePdf() throws IOException {
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		try (PdfWriter writer = new PdfWriter(outputStream);
				PdfDocument pdf = new PdfDocument(writer);
				Document document = new Document(pdf)){
			float columnWidth[]= {50f,100f,25f,25f,50f,50f};
			Table table = new Table(columnWidth);
			table.setWidth(100);
			table.addHeaderCell("Service");
            table.addHeaderCell("");
            table.addHeaderCell("Qty");
            table.addHeaderCell("Rate");
            table.addHeaderCell("Consession");
            table.addHeaderCell("Total Amount");
            
            
            table.addCell(new Cell().add(new Paragraph("Registration")));
            table.addCell(new Cell().add(new Paragraph("Registration Charges")));
            table.addCell(new Cell().add(new Paragraph("1")));
            table.addCell(new Cell().add(new Paragraph("100")));
            table.addCell(new Cell().add(new Paragraph("0")));
            table.addCell(new Cell().add(new Paragraph("100")));
            
            
            table.addCell(new Cell().add(new Paragraph("Consultation")));
            table.addCell(new Cell().add(new Paragraph("Consultation1")));
            table.addCell(new Cell().add(new Paragraph("1")));
            table.addCell(new Cell().add(new Paragraph("100")));
            table.addCell(new Cell().add(new Paragraph("0")));
            table.addCell(new Cell().add(new Paragraph("100")));
            
            
            table.addCell(new Cell().add(new Paragraph("")));
            table.addCell(new Cell().add(new Paragraph("Validity: 1 Consultation(s) Before 30-08-2018")));
            table.addCell(new Cell().add(new Paragraph("")));
            table.addCell(new Cell().add(new Paragraph("")));
            table.addCell(new Cell().add(new Paragraph("")));
            table.addCell(new Cell().add(new Paragraph("")));
            
            table.addCell(new Cell().add(new Paragraph("Procedures")));
            table.addCell(new Cell().add(new Paragraph("procedure1")));
            table.addCell(new Cell().add(new Paragraph("")));
            table.addCell(new Cell().add(new Paragraph("")));
            table.addCell(new Cell().add(new Paragraph("")));
            table.addCell(new Cell().add(new Paragraph("")));
            
            table.addCell(new Cell().add(new Paragraph("")));
            table.addCell(new Cell().add(new Paragraph("procedure2")));
            table.addCell(new Cell().add(new Paragraph("")));
            table.addCell(new Cell().add(new Paragraph("")));
            table.addCell(new Cell().add(new Paragraph("")));
            table.addCell(new Cell().add(new Paragraph("")));
            
            
            
            
            
            
			
		document.add(table);

    } catch (Exception e) {
        e.printStackTrace();
    }

    return outputStream.toByteArray();

}
	}
	     