const router = require("express").Router();
const {
  getObjectURL,
  putObjectURL,
  uploadObjectToS3,
} = require("../../utils/s3Connection");
const { dbConfig } = require("../../utils/db");
const mysql = require("mysql2");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

async function fetchDBFileURL(fileName) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(dbConfig);
    const query = `SELECT sf.fileName, sf.s3URL, sf.person_name FROM s3files sf WHERE sf.fileName = ?`;

    connection.query(query, [fileName], (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        reject(err);
      } else {
        resolve(results);
      }
      connection.end();
    });
  });
}

async function fetchAllData() {
  const connection = mysql.createConnection(dbConfig);

  return new Promise((resolve, reject) => {
    const query = `SELECT sf.fileName, sf.s3URL, sf.person_name FROM s3files sf`;

    connection.query(query, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        reject(err);
      } else {
        resolve(results);
      }
      connection.end(); // Close connection after query execution
    });
  });
}

async function createS3FileURL(data, fileName, contentType) {
  const pdfPUTDataURL = await putObjectURL(fileName, contentType);
  if (pdfPUTDataURL) {
    const res = await uploadObjectToS3(pdfPUTDataURL, data.buffer, contentType);
    if (res && res.status == 200 && res.statusText == "OK") {
      return { success: true };
    }
  }
}

async function fetchS3FileURL(fileName, person_name) {
  const s3FileURL = await getObjectURL(fileName);
  if (s3FileURL) {
    const connection = mysql.createConnection(dbConfig);
    try {
      await connection.execute(
        "INSERT INTO s3files (fileName, s3URL, person_name) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE fileName = VALUES(fileName), s3URL = VALUES(s3URL), person_name = VALUES(person_name)",
        [fileName, s3FileURL, person_name]
      );
    } catch (error) {
      console.error("Error inserting PDF URL:", error);
    } finally {
      // Close the connection
      await connection.end();
      return s3FileURL;
    }
  }
}

router.post("/upload", upload.array("demo[]", 1), async (req, res) => {
  const { fileName, contentType, person_name } = req.query;
  if (!req.files || req.files.length === 0) {
    return res.status(400).send("No files uploaded.");
  }
  try {
    const data = await fetchDBFileURL(fileName);
    if (data && data[0] && data[0].s3URL && data[0].s3URL.length > 0) {
      res.json({ success: true });
    } else {
      const uploadedFile = req.files[0];
      const fileData = await createS3FileURL(
        uploadedFile,
        fileName,
        contentType
      );
      if (fileData.success) {
        const s3URL = await fetchS3FileURL(fileName, person_name);
        res.json({ url: s3URL, ...fileData });
      }
    }
  } catch (error) {
    console.error("Error creating data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/fetch", async (req, res) => {
  const { fileName } = req.query;
  try {
    const data = await fetchDBFileURL(fileName);
    if (data && data[0] && data[0].s3URL && data[0].s3URL.length > 0) {
      console.log("calling db");
      res.send(data[0].s3URL);
    } else {
      console.log("calling AWS");
      const fileData = await fetchS3FileURL(data);
      res.send(fileData);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/fetchAllFiles", async (req, res) => {
  try {
    const data = await fetchAllData();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
