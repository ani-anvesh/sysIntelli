const router = require("express").Router();
const instance = require("../services/axiosService");

const SLOT_TIMINGS_ROUTE = "/slotTimingList";
const SLOT_INFO_ROUTE = "/slotInfo";

router.get("/allSlots", async (req, res) => {
  try {
    instance
      .get(SLOT_TIMINGS_ROUTE)
      .then((response) => {
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

router.get("/:doctorId/slotInfo", async (req, res) => {
  let url =
    "/" +
    req.params.doctorId +
    SLOT_INFO_ROUTE +
    "?date=" +
    req.query.date +
    "&shiftId=" +
    shiftId;
  try {
    instance
      .get(url)
      .then((response) => {
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
