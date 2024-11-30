const express = require('express');
const router = express.Router();
const { getComments, submitComment } = require("../controllers/commentController");

router.get("/", getComments);

router.post("/submit", submitComment);

module.exports = router;
