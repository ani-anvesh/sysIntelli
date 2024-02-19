const router = require("express").Router();
const { dbConfig } = require("../../utils/db");
const mysql = require("mysql2");
const PDFDocument = require("pdfkit");
const fs = require("fs");

async function fetchData(person_id, vist_id, receipt_id) {
  const connection = mysql.createConnection(dbConfig);

  return new Promise((resolve, reject) => {
    const query = `
    SELECT 
      pv.vist_id, pv.receipt_id, pv.person_id, pv.pro_consession, pv.pro_name, 
      pv.pro_qty, pv.pro_rate, pv.ref_consession, pv.ref_name, pv.ref_qty, 
      pv.ref_rate, pv.time_stamp, pv.visit_address, 
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
        connection.end(); // Close connection after query execution
      }
    );
  });
}

function createPDF(data) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();

    // Create a buffer to store the PDF content
    const buffers = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    // Add content to the PDF
    doc.fontSize(18).text("Data from Database", { align: "center" });

    // Add table headers
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

    // Add table data from the database
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

    // Finalize the PDF
    doc.end();
  });
}

// // Define your route
// router.get("/create", async (req, res) => {
//   const { person_id, vist_id, receipt_id } = req.query;

//   try {
//     const data = await fetchData(person_id, vist_id, receipt_id);
//     createPDF(data);
//     res.json(data);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

router.get("/create", async (req, res) => {
  const { person_id, vist_id, receipt_id } = req.query;

  try {
    const data = await fetchData(person_id, vist_id, receipt_id);
    const pdfData = await createPDF(data);

    // Send the PDF file to the frontend
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=example.pdf");
    res.send(pdfData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
