const express = require("express");
const router = express.Router();

const meController = require("../app/controllers/meController");

router.get("/users", meController.getUsers);
router.get("/turnover", meController.turnover);
router.get("/view-counts", meController.viewCounts);
router.get("/stored/courses", meController.storedCourses);
router.get("/trash/courses", meController.trashCourses);

module.exports = router;
