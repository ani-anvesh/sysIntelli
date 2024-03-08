const router = require("express").Router();
const instance = require("../services/axiosService");

var ROUTE = "/totalAvailableSlots";

// Define your route
router.get("/:doctorId/totalAvailableSlots", async (req, res) => {
  console.log(req.query);
  console.log(req.params);
  const { startDate, endDate } = req.query;
  let url =
    "/" +
    req.params.doctorId +
    ROUTE +
    "?startDate=" +
    startDate +
    "&endDate=" +
    endDate;
  try {
    instance
      .get(url)
      .then((response) => {
        console.log(response.data); // Process the response data
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
