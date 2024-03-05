const router = require("express").Router();
const { dbConfig } = require("../../utils/db");
const mysql = require("mysql2");

async function fetchAllData() {
  const connection = mysql.createConnection(dbConfig);

  return new Promise((resolve, reject) => {
    const query = `
        SELECT pv.vist_id, pv.receipt_id, pv.person_id, pv.pro_consession, pv.pro_name, pv.pro_qty, pv.pro_rate,
               pv.ref_consession, pv.ref_name, pv.ref_qty, pv.ref_rate, pv.time_stamp, pv.visit_address,
               pd.address, pd.dob, pd.gender, pd.person_name
        FROM person_visit pv
        JOIN personal_details pd ON pv.person_id = pd.person_id`;

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

// Define your route
router.get("/all", async (req, res) => {
  try {
    const data = await fetchAllData();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
