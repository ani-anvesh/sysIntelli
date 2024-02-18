package com.sysintelli.pdfGenerator.helper;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import com.sysintelli.pdfGenerator.model.PersonalDetails;

public class Helper {

// checks the file whether it is form of excel type or not
	public static boolean checkExcelFormat(MultipartFile file) {

		String contentType = file.getContentType();
		
		return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet".equals(contentType);

	}

	public static List<PersonalDetails> convertExcelToListOfPersonalDetails(InputStream is) {

		List<PersonalDetails> list = new ArrayList<>();

		try {

			XSSFWorkbook workbook = new XSSFWorkbook(is);

			XSSFSheet sheet = workbook.getSheet("data");

			int rowNumber = 0;

			Iterator<Row> iterator = sheet.iterator();

			while (iterator.hasNext()) {
				Row row = iterator.next();

				if (rowNumber == 0) {
					rowNumber++;
					continue;
				}

				Iterator<Cell> cells = row.iterator();

				int cid = 0;

				PersonalDetails p = new PersonalDetails();

				while (cells.hasNext()) {
					Cell cell = cells.next();

					switch (cid) {
					case 0:
						p.setPersonId((int) cell.getNumericCellValue());
						break;
					case 1:
						p.setPersonName(cell.getStringCellValue());
						break;
					case 2:
						p.setGender(cell.getStringCellValue());
						break;
					case 3:
						p.setDob(cell.getStringCellValue());
						break;
					case 4:
						p.setAddress(cell.getStringCellValue());

					default:

						break;
					}
					cid++;
				}
				
				list.add(p);

			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}

}
