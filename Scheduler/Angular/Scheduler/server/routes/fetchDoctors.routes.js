const router = require("express").Router();
const instance = require("../services/axiosService");

const ROUTE = "/doctorsList";

// Define your route
router.get("/all", async (req, res) => {
  try {
    instance
      .get(ROUTE)
      .then((response) => {
        console.log(response.data); // Process the response data
        res.send();
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
