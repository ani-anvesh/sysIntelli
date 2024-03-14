const { sendMessage, receiveMessages } = require("../../utils/sqsConnection");

const router = require("express").Router();

router.post("/send-message", async (req, res) => {
  let body = req.body;
  sendMessage(body)
    .then(() => {
      res.send("message sent successful");
    })
    .catch((error) => {
      console.error("Error sending message:", error);
    });
});

router.get("/receive-message", async (req, res) => {
  try {
    const messages = await receiveMessages();
    console.log(messages);
    const messagesWithDoctorId = messages.reduce((accumulator, message) => {
      const parsedBody = JSON.parse(message.Body);
      if (
        parsedBody.doctorId == req.query.doctorId &&
        parsedBody.date == req.query.date &&
        parsedBody.shiftId == req.query.shiftId
      ) {
        accumulator.push(parsedBody);
      }
      return accumulator;
    }, []);
    res.json(messagesWithDoctorId);
  } catch (error) {
    console.error("Error retrieving messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
