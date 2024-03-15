const router = require("express").Router();
SLOT_LOCKING_ROUTE = "/tempData";
SLOT_RECEIVING_ROUTE = "/tempDataList";

router.post("/send-message", async (req, res) => {
  let body = req.body;
  try {
    instance
      .post(SLOT_LOCKING_ROUTE, body)
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

router.get("/receive-message", async (req, res) => {
  try {
    instance
      .get(SLOT_RECEIVING_ROUTE)
      .then((response) => {
        const messagesWithDoctorId = response.reduce((accumulator, message) => {
          if (
            message.doctorId == req.query.doctorId &&
            message.date == req.query.date &&
            message.shiftId == req.query.shiftId
          ) {
            accumulator.push(message);
          }
          return accumulator;
        }, []);
        res.json(messagesWithDoctorId);
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
