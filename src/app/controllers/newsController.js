const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");

class newsController {
  // [GET] /news
  index(req, res) {
    res.render("news");
  }

  // [GET] /news/:slug
  show(req, res) {
    res.send("NEW DETAIL");
  }

  storedCourses(req, res, next) {
    let courseQuery = Course.find({});

    if (req.query.hasOwnProperty("_sort")) {
      courseQuery = courseQuery.sort({
        [req.query.column]: req.query.type,
      });
    }

    Promise.all([courseQuery, Course.countDocumentsDeleted()])
      .then(([courses, deletedCount]) =>
        res.render("me/stored-courses", {
          deletedCount,
          courses: multipleMongooseToObject(courses),
        })
      )
      .catch(next);
  }
}

module.exports = new newsController();
