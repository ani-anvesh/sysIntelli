const multer = require("multer");
const router = require("express").Router();
var XLSX = require("xlsx");
const _ = require("lodash");
const mysql = require("mysql2/promise");
const { dbConfig } = require("../../utils/db");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const conversToArrayOfObjects = (dataArray) => {
  const names = dataArray[0];
  const dataWithoutNames = dataArray.slice(1);
  const mappedObjects = dataWithoutNames.map((innerArray) => {
    return _.zipObject(names, innerArray);
  });
  return mappedObjects;
};

async function saveDataToDatabase(data) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    for (const entry of data) {
      await connection.execute(
        "INSERT INTO personal_details (person_id, address, dob, gender, person_name) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE address = VALUES(address), dob = VALUES(dob), gender = VALUES(gender), person_name = VALUES(person_name)",
        [
          entry.person_id,
          entry.address,
          entry.dob,
          entry.gender,
          entry.person_name,
        ]
      );
      await connection.execute(
        "INSERT INTO person_visit (vist_id, pro_consession, pro_name, pro_qty, pro_rate, receipt_id, ref_consession, ref_name, ref_qty, ref_rate, time_stamp, visit_address, person_id, pdfURL) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          entry.vist_id,
          entry.pro_consession,
          entry.pro_name,
          entry.pro_qty,
          entry.pro_rate,
          entry.receipt_id,
          entry.ref_consession,
          entry.ref_name,
          entry.ref_qty,
          entry.ref_rate,
          entry.time_stamp,
          entry.visit_address,
          entry.person_id,
          "",
        ]
      );
    }

    await connection.end();
  } catch (error) {
    console.error("Error:", error);
  }
}

router.post("/upload", upload.array("demo[]", 1), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files uploaded.");
  }

  const uploadedFile = req.files[0];
  const workbook = XLSX.read(uploadedFile.buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  resData = conversToArrayOfObjects(data);
  saveDataToDatabase(resData);
  res.json({ success: true });
});

module.exports = router;
