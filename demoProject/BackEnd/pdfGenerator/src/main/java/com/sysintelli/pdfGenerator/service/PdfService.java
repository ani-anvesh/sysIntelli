package com.sysintelli.pdfGenerator.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

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
	public byte[] generatePdf(Integer personId, Integer vistId) throws IOException {
		List<Object[]> detailsList = personVisitRepository.findDetailsByPersonIdAndVisitId(personId, vistId);
            Object[] details = detailsList.get(0);
            int receiptId=(Integer) details[0]; 
            String visitAddress=(String) details[1];
            String proName=(String) details[2];
            int proQty=(Integer) details[3];
            int proRate=(Integer) details[4];
            int proConcession=(Integer) details[5];
            String refName=(String) details[6];
            int refQty=(Integer) details[7];
            int refRate=(Integer) details[8];
            int refConcession=(Integer) details[9];
            int proTotalAmout=(proQty*proRate)-proConcession;
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		try (PdfWriter writer = new PdfWriter(outputStream);
				PdfDocument pdf = new PdfDocument(writer);
				Document document = new Document(pdf)){
			float columnWidth[]= {100f,200f,50f,50f,100f,100f};
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
            table.addCell(new Cell().add(new Paragraph(proName)));
            table.addCell(new Cell().add(new Paragraph(String.valueOf(proQty))));
            table.addCell(new Cell().add(new Paragraph(String.valueOf(proRate))));
            table.addCell(new Cell().add(new Paragraph(String.valueOf(proConcession))));
            table.addCell(new Cell().add(new Paragraph(String.valueOf(proTotalAmout))));
            
           // table.addCell(new Cell().add(new Paragraph("")));
           // table.addCell(new Cell().add(new Paragraph("procedure2")));
           //table.addCell(new Cell().add(new Paragraph("")));
           //table.addCell(new Cell().add(new Paragraph("")));
           // table.addCell(new Cell().add(new Paragraph("")));
           // table.addCell(new Cell().add(new Paragraph("")));
            
            
            
            float columnWidth1[]= {100f,200f,50f,50f,100f,100f};
			Table table1 = new Table(columnWidth1);
			table1.setWidth(100);
			table1.addHeaderCell("Service");
            table1.addHeaderCell("");
            table1.addHeaderCell("Qty");
            table1.addHeaderCell("Rate");
            table1.addHeaderCell("Consession");
            table1.addHeaderCell("Total Amount");
            
            
            table1.addCell(new Cell().add(new Paragraph("Procedures")));
            table1.addCell(new Cell().add(new Paragraph(proName)));
            table1.addCell(new Cell().add(new Paragraph(String.valueOf(proQty))));
            table1.addCell(new Cell().add(new Paragraph(String.valueOf(proRate))));
            table1.addCell(new Cell().add(new Paragraph(String.valueOf(proConcession))));
            table1.addCell(new Cell().add(new Paragraph(String.valueOf(proTotalAmout))));
            
            
            
            
            
			
		document.add(table);
		document.add(table1);

    } catch (Exception e) {
        e.printStackTrace();
    }

    return outputStream.toByteArray();

}
	}
	     