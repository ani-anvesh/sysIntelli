const router = require("express").Router();
const instance = require("../services/axiosService");

var ROUTE = "/totalAvailableSlots";

router.get("/:doctorId/totalAvailableSlots", async (req, res) => {
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
        console.log(response.data);
        res.send(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
