package com.sysintelli.pdfGenerator.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.borders.DottedBorder;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Div;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.property.UnitValue;
import com.sysintelli.pdfGenerator.model.PersonVisit;
import com.sysintelli.pdfGenerator.model.PersonalDetails;
import com.sysintelli.pdfGenerator.repository.PersonVisitRepository;
import com.sysintelli.pdfGenerator.repository.PersonalDetailsRepository;

@Service
public class PdfService {
	
	
	
	
	
	public void parseExcelFile(MultipartFile file) throws IOException {
	    List<PersonalDetails> personalDetailsList = new ArrayList<>();
	    List<PersonVisit> personVisitList = new ArrayList<>();

	    try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
	        Sheet sheet = workbook.getSheetAt(0);
	        DataFormatter dataFormatter = new DataFormatter();

	        for (Row row : sheet) {
	            if (row.getRowNum() == 0) {
	                continue; // Skip header row
	            }
	            PersonalDetails personalDetails = new PersonalDetails();
	            PersonVisit personVisit = new PersonVisit();

	            for (org.apache.poi.ss.usermodel.Cell cell : row) {
	                int columnIndex = cell.getColumnIndex();

	                switch (columnIndex) {
	                    // PersonalDetails columns
	                    case 0:
	                        if (cell.getCellType() == CellType.NUMERIC) {
	                            personalDetails.setPersonId((int) cell.getNumericCellValue());
	                        } else {
	                            personalDetails.setPersonId(Integer.parseInt(dataFormatter.formatCellValue(cell)));
	                        }
	                        break;
	                    case 1:
	                        personalDetails.setPersonName(dataFormatter.formatCellValue(cell));
	                        break;
	                    case 2:
	                        personalDetails.setGender(dataFormatter.formatCellValue(cell));
	                        break;
	                    case 3:
	                        personalDetails.setDob(dataFormatter.formatCellValue(cell));
	                        break;
	                    case 4:
	                        personalDetails.setAddress(dataFormatter.formatCellValue(cell));
	                        break;
	                    // PersonVisit columns
	                    case 5:
	                        if (cell.getCellType() == CellType.NUMERIC) {
	                            personVisit.setVistId((int) cell.getNumericCellValue());
	                        } else {
	                            personVisit.setVistId(Integer.parseInt(dataFormatter.formatCellValue(cell)));
	                        }
	                        break;
	                    case 6:
	                    	personVisit.setPersonalDetails(personalDetails);
//                          break;
	                        break;
	                    case 7:
	                        if (cell.getCellType() == CellType.NUMERIC) {
	                            personVisit.setReceiptId((int) cell.getNumericCellValue());
	                        } else {
	                            personVisit.setReceiptId(Integer.parseInt(dataFormatter.formatCellValue(cell)));
	                        }
	                        break;
	                    case 8:
	                        personVisit.setVisitAddress(dataFormatter.formatCellValue(cell));
	                        break;
	                    case 9:
	                        personVisit.setProName(dataFormatter.formatCellValue(cell));
	                        break;
	                    case 10:
	                        if (cell.getCellType() == CellType.NUMERIC) {
	                            personVisit.setProQty((int) cell.getNumericCellValue());
	                        } else {
	                            personVisit.setProQty(Integer.parseInt(dataFormatter.formatCellValue(cell)));
	                        }
	                        break;
	                    case 11:
	                        if (cell.getCellType() == CellType.NUMERIC) {
	                            personVisit.setProRate((int) cell.getNumericCellValue());
	                        } else {
	                            personVisit.setProRate(Integer.parseInt(dataFormatter.formatCellValue(cell)));
	                        }
	                        break;
	                    case 12:
	                        if (cell.getCellType() == CellType.NUMERIC) {
	                            personVisit.setProConsession((int) cell.getNumericCellValue());
	                        } else {
	                            personVisit.setProConsession(Integer.parseInt(dataFormatter.formatCellValue(cell)));
	                        }
	                        break;
	                    case 13:
	                        personVisit.setRefName(dataFormatter.formatCellValue(cell));
	                        break;
	                    case 14:
	                        if (cell.getCellType() == CellType.NUMERIC) {
	                            personVisit.setRefQty((int) cell.getNumericCellValue());
	                        } else {
	                            personVisit.setRefQty(Integer.parseInt(dataFormatter.formatCellValue(cell)));
	                        }
	                        break;
	                    case 15:
	                        if (cell.getCellType() == CellType.NUMERIC) {
	                            personVisit.setRefRate((int) cell.getNumericCellValue());
	                        } else {
	                            personVisit.setRefRate(Integer.parseInt(dataFormatter.formatCellValue(cell)));
	                        }
	                        break;
	                    case 16:
	                        if (cell.getCellType() == CellType.NUMERIC) {
	                            personVisit.setRefConsession((int) cell.getNumericCellValue());
	                        } else {
	                            personVisit.setRefConsession(Integer.parseInt(dataFormatter.formatCellValue(cell)));
	                        }
	                        break;
	                    case 17:
	                        personVisit.setTimeStamp(dataFormatter.formatCellValue(cell));
	                        break;
	                    default:
	                        break;
	                }
	            }
	            personVisitList.add(personVisit);
	            personalDetailsList.add(personalDetails);
	        }
	    }

	    personalDetailsRepository.saveAll(personalDetailsList);
	    personVisitRepository.saveAll(personVisitList);
	}


	private Cell createLabelValueCell(String label, String value) {
		Paragraph labelParagraph = new Paragraph(label).setBold();
		Paragraph valueParagraph = new Paragraph(value);
		Cell cell = new Cell().add(labelParagraph).add(valueParagraph).setBorder(null);
		return cell;
	}

	@Autowired
	private PersonVisitRepository personVisitRepository;
	@Autowired
	private PersonalDetailsRepository personalDetailsRepository;

	public byte[] generatePdf(Integer personId, Integer vistId) throws IOException {
		List<Object[]> detailsList = personVisitRepository.findDetailsByPersonIdAndVisitId(personId, vistId);
		Object[] details = detailsList.get(0);
		int receiptId = (Integer) details[0];
		String visitAddress = (String) details[1];
		String proName = (String) details[2];
		int proQty = (Integer) details[3];
		int proRate = (Integer) details[4];
		int proConcession = (Integer) details[5];
		String refName = (String) details[6];
		int refQty = (Integer) details[7];
		int refRate = (Integer) details[8];
		int refConcession = (Integer) details[9];
		int proTotalAmout = (proQty * proRate) - proConcession;
		int refTotalAmout = (refQty * refRate) - refConcession;
		PersonalDetails personalDetails = personalDetailsRepository.findById(personId).orElse(null);
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
		try (PdfWriter writer = new PdfWriter(outputStream);
				PdfDocument pdf = new PdfDocument(writer);
				Document document = new Document(pdf)) {

			Div divider = new Div().setBorder(new DottedBorder(1));

			float columnWidth3[] = { 500f, 300f };
			Table table3 = new Table(UnitValue.createPercentArray(columnWidth3));
			String imagePath = "C:\\Users\\vallu\\OneDrive\\Desktop\\Screenshot 2024-02-19 112546.png";
			Image image = new Image(ImageDataFactory.create(imagePath));
			image.scaleToFit(100, 100);
			table3.addCell(new com.itextpdf.layout.element.Cell().add(image).setBorder(Border.NO_BORDER));
			table3.addCell(new com.itextpdf.layout.element.Cell()
					.add(new Paragraph(
							"10380 MayaLinda rd"))
					.setBorder(Border.NO_BORDER).setBold());
			// table3.addCell(new Cell().add(new
			// Paragraph("GSTIN:36AYWPT5476M1FD")).setBorder(Border.NO_BORDER));

			float columnWidth2[] = { 1000f, 1000f, 2000f, 1000f };
			Table table2 = new Table(UnitValue.createPercentArray(columnWidth2));
			table2.addCell(new Cell().add(new Paragraph("OP RECEIPT")).setBorder(Border.NO_BORDER).setBold());
			table2.addCell(new Cell().add(new Paragraph("REC#:1810-0001")).setBorder(Border.NO_BORDER));
			table2.addCell(new Cell().add(new Paragraph("Receipt Date:12-Aug-2020")).setBorder(Border.NO_BORDER));
			table2.addCell(new Cell().add(new Paragraph("visit ID:" + vistId)).setBorder(Border.NO_BORDER));

			float columnWidth0[] = { 200f, 200f, 200f, 100f, 250f };
			Table table0 = new Table(UnitValue.createPercentArray(columnWidth0));
			table0.addCell(new Cell().add(new Paragraph("Patient Details:")).setBorder(Border.NO_BORDER).setBold());
			table0.addCell(createLabelValueCell("patient Name:", personalDetails.getPersonName()));
			table0.addCell(
					createLabelValueCell("Gender/DOB:", personalDetails.getGender() + "/" + personalDetails.getDob()));
			table0.addCell(createLabelValueCell("UHID:", "PS018"));
			table0.addCell(createLabelValueCell("Address:", personalDetails.getAddress()));
			// table0.addCell(new Cell().add(new Paragraph("patient Name:" +
			// personalDetails.getPersonName())).setBorder(Border.NO_BORDER));
			// table0.addCell(new Cell().add(new Paragraph("Gender/DOB:" +
			// personalDetails.getGender() +"/"+
			// personalDetails.getDob())).setBorder(Border.NO_BORDER));
			// table0.addCell(new Cell().add(new
			// Paragraph("UHID:PS018")).setBorder(Border.NO_BORDER));
			// table0.addCell(new Cell().add(new Paragraph("Address:" +
			// personalDetails.getAddress())).setBorder(Border.NO_BORDER));

			float columnWidth[] = { 100f, 200f, 50f, 50f, 100f, 100f };
			Table table = new Table(UnitValue.createPercentArray(columnWidth));
			table.addHeaderCell(new Cell().add(new Paragraph("Service")).setBold());
			table.addHeaderCell(new Cell().add(new Paragraph("")).setBold());
			table.addHeaderCell(new Cell().add(new Paragraph("Qty")).setBold());
			table.addHeaderCell(new Cell().add(new Paragraph("Rate")).setBold());
			table.addHeaderCell(new Cell().add(new Paragraph("Consession")).setBold());
			table.addHeaderCell(new Cell().add(new Paragraph("Total Amount")).setBold());

			table.addCell(new Cell().add(new Paragraph("Registration")).setBold());
			table.addCell(new Cell().add(new Paragraph("Registration Charges")));
			table.addCell(new Cell().add(new Paragraph("1")));
			table.addCell(new Cell().add(new Paragraph("100")));
			table.addCell(new Cell().add(new Paragraph("0")));
			table.addCell(new Cell().add(new Paragraph("100")));

			table.addCell(new Cell().add(new Paragraph("Consultation")).setBold());
			table.addCell(new Cell().add(new Paragraph("Consultation1")));
			table.addCell(new Cell().add(new Paragraph("1")));
			table.addCell(new Cell().add(new Paragraph("100")));
			table.addCell(new Cell().add(new Paragraph("0")));
			table.addCell(new Cell().add(new Paragraph("100")));

			table.addCell(new Cell().add(new Paragraph("")));
			table.addCell(new Cell().add(new Paragraph("Validity: 1 Consultation(s) Before 30-08-2018"))
					.setBorder(Border.NO_BORDER));
			table.addCell(new Cell().add(new Paragraph("")).setBorder(Border.NO_BORDER));
			table.addCell(new Cell().add(new Paragraph("")).setBorder(Border.NO_BORDER));
			table.addCell(new Cell().add(new Paragraph("")).setBorder(Border.NO_BORDER));
			table.addCell(new Cell().add(new Paragraph("")));

			table.addCell(new Cell().add(new Paragraph("Procedures")).setBold());
			table.addCell(new Cell().add(new Paragraph(refName)));
			table.addCell(new Cell().add(new Paragraph(String.valueOf(refQty))));
			table.addCell(new Cell().add(new Paragraph(String.valueOf(refRate))));
			table.addCell(new Cell().add(new Paragraph(String.valueOf(refConcession))));
			table.addCell(new Cell().add(new Paragraph(String.valueOf(refTotalAmout))));

			float columnWidth1[] = { 100f, 250f, 50f, 50f, 100f, 100f };
			Table table1 = new Table(UnitValue.createPercentArray(columnWidth1));
			table1.addHeaderCell(new Cell().add(new Paragraph("Service")).setBold());
			table1.addHeaderCell(new Cell().add(new Paragraph("")).setBold());
			table1.addHeaderCell(new Cell().add(new Paragraph("Qty")).setBold());
			table1.addHeaderCell(new Cell().add(new Paragraph("Rate")).setBold());
			table1.addHeaderCell(new Cell().add(new Paragraph("Consession")).setBold());
			table1.addHeaderCell(new Cell().add(new Paragraph("Total Amount")).setBold());

			table1.addCell(new Cell().add(new Paragraph("Procedures")));
			table1.addCell(new Cell().add(new Paragraph(proName)));
			table1.addCell(new Cell().add(new Paragraph(String.valueOf(proQty))));
			table1.addCell(new Cell().add(new Paragraph(String.valueOf(proRate))));
			table1.addCell(new Cell().add(new Paragraph(String.valueOf(proConcession))));
			table1.addCell(new Cell().add(new Paragraph(String.valueOf(proTotalAmout))));

			document.add(divider);
			document.add(table3);
			document.add(divider);
			// document.add(new Paragraph("\n"));
			document.add(table2);
			// document.add(new Paragraph("\n"));
			document.add(divider);
			// document.add(new Paragraph("\n"));
			document.add(table0);
			// document.add(new Paragraph("\n"));
			document.add(divider);
			document.add(new Paragraph("\n"));
			document.add(table);
			document.add(new Paragraph("\n"));
			document.add(divider);
			document.add(new Paragraph("\n"));
			document.add(table1);
			document.add(new Paragraph("\n"));
			document.add(divider);

		} catch (Exception e) {
			e.printStackTrace();
		}

		return outputStream.toByteArray();

	}
}