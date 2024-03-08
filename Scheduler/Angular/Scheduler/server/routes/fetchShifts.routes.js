const router = require("express").Router();
const instance = require("../services/axiosService");

const ROUTE = "/totalAvailableSlots";

// Define your route
router.get("/totalAvailableSlots", async (req, res) => {
  console.log(req.query);
  const { startDate, endDate } = req.query;
  try {
    instance
      .get(ROUTE)
      .then((response) => {
        // console.log(response.data); // Process the response data
        res.send(response.data);
      })
      .catch((error) => {
        console.error(error); // Handle any errors
      });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
