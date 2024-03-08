const router = require("express").Router();
const instance = require("../services/axiosService");

const ROUTE = "/doctorsList";

router.get("/all", async (req, res) => {
  try {
    instance
      .get(ROUTE)
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
