const router = require("express").Router();
const { dbConfig } = require("../../utils/db");
const mysql = require("mysql2");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const {
  getObjectURL,
  putObjectURL,
  uploadObjectToS3,
} = require("../../utils/s3Connection");

async function fetchData(person_id, vist_id, receipt_id) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(dbConfig);
    const query = `
    SELECT 
      pv.vist_id, pv.receipt_id, pv.person_id, pv.pro_consession, pv.pro_name, 
      pv.pro_qty, pv.pro_rate, pv.ref_consession, pv.ref_name, pv.ref_qty, 
      pv.ref_rate, pv.time_stamp, pv.visit_address, pv.pdfURL,
      pd.address, pd.dob, pd.gender, pd.person_name 
    FROM 
      person_visit pv 
      JOIN personal_details pd ON pv.person_id = pd.person_id 
    WHERE 
      pv.person_id = ? AND pv.vist_id = ? AND pv.receipt_id = ?
  `;

    connection.query(
      query,
      [person_id, vist_id, receipt_id],
      (err, results) => {
        if (err) {
          console.error("Error executing query:", err);
          reject(err);
        } else {
          resolve(results);
        }
        connection.end();
      }
    );
  });
}

function createPDF(data) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();

    const buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    doc.fontSize(18).text("Data from Database", { align: "center" });

    const headers = [
      "Visit ID",
      "Receipt ID",
      "Person ID",
      "Pro Concession",
      "Pro Name",
      "Pro Qty",
      "Pro Rate",
      "Ref Concession",
      "Ref Name",
      "Ref Qty",
      "Ref Rate",
      "Timestamp",
      "Visit Address",
      "Address",
      "DOB",
      "Gender",
      "Person Name",
    ];
    doc.font("Helvetica-Bold");
    doc.text(headers.join(","), { align: "center" });

    doc.font("Helvetica");
    data.forEach((item) => {
      const row = [
        item.vist_id,
        item.receipt_id,
        item.person_id,
        item.pro_consession,
        item.pro_name,
        item.pro_qty,
        item.pro_rate,
        item.ref_consession,
        item.ref_name,
        item.ref_qty,
        item.ref_rate,
        item.time_stamp,
        item.visit_address,
        item.address,
        item.dob,
        item.gender,
        item.person_name,
      ];
      doc.text(row.join(","), { align: "center" });
    });

    doc.end();
  });
}

async function createS3PDFURL(dbData) {
  const pdfData = await createPDF(dbData);
  const pdfName = `receipt_${
    dbData[0].person_id.toString() +
    "_" +
    dbData[0].vist_id.toString() +
    "_" +
    dbData[0].receipt_id.toString() +
    "_" +
    dbData[0].person_name
  }.pdf`;
  const pdfPUTDataURL = await putObjectURL(pdfName, "application/pdf");
  if (pdfPUTDataURL) {
    const res = await uploadObjectToS3(
      pdfPUTDataURL,
      pdfData,
      "application/pdf"
    );
    if (res && res.status == 200 && res.statusText == "OK") {
      const pdfURL = await getObjectURL(pdfName);
      if (pdfURL) {
        const connection = mysql.createConnection(dbConfig);
        try {
          await connection.execute(
            "UPDATE person_visit SET pdfURL = ? WHERE person_id = ? AND vist_id = ? AND receipt_id = ?",
            [
              pdfURL,
              dbData[0].person_id,
              dbData[0].vist_id,
              dbData[0].receipt_id,
            ]
          );
        } catch (error) {
          console.error("Error inserting PDF URL:", error);
        } finally {
          // Close the connection
          await connection.end();
          return pdfURL;
        }
      }
    }
  }
}

router.get("/create", async (req, res) => {
  const { person_id, vist_id, receipt_id } = req.query;

  try {
    const data = await fetchData(person_id, vist_id, receipt_id);
    const pdfData = await createPDF(data);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=example.pdf");
    res.send(pdfData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/createS3", async (req, res) => {
  const { person_id, vist_id, receipt_id } = req.query;

  try {
    const data = await fetchData(person_id, vist_id, receipt_id);
    if (data && data[0] && data[0].pdfURL && data[0].pdfURL.length > 0) {
      console.log("calling db");
      res.send(data[0].pdfURL);
    } else {
      console.log("calling AWS");
      const pdfData = await createS3PDFURL(data);
      res.send(pdfData);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
