const instance = require("../services/axiosService");

const router = require("express").Router();

SLOT_BOOKING_ROUTE = "/appointments";

router.post("/:doctorId/book", async (req, res) => {
  let body = req.body;

  try {
    instance
      .post(req.params.doctorId + SLOT_BOOKING_ROUTE, body)
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
