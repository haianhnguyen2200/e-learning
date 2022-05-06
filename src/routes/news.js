const express = require("express");
const router = express.Router();

const newsController = require("../app/controllers/newsController");

router.get("/:slug", newsController.show);
router.get("/news", newsController.storedCourses);
router.get("/", newsController.index);

module.exports = router;
