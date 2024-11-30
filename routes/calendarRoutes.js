const express = require("express");
const router = express.Router();
const calendarController = require("../controllers/calendarController");

router.get("/dates/:current", calendarController.getCalendarDate);

module.exports = router;
