const Course = require("../models/Course");
const Products = require("../models/product");
const { multipleMongooseToObject } = require("../../util/mongoose");

class meController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    let courseQuery = Products.find({});

    if (req.query.hasOwnProperty("_sort")) {
      courseQuery = courseQuery.sort({
        [req.query.column]: req.query.type,
      });
    }

    Promise.all([courseQuery, Products.countDocumentsDeleted()])
      .then(([products, deletedCount]) =>
        res.render("me/stored-courses", {
          deletedCount,
          products: multipleMongooseToObject(products),
        })
      )
      .catch(next);
  }

  // [GET] /me/trash/courses
  trashCourses(req, res, next) {
    Course.findDeleted({})
      .then((courses) =>
        res.render("me/trash-courses", {
          courses: multipleMongooseToObject(courses),
        })
      )
      .catch(next);
  }

  viewCounts(req, res, next) {
    let courseQuery = Course.find({});

    if (req.query.hasOwnProperty("_sort")) {
      courseQuery = courseQuery.sort({
        [req.query.column]: req.query.type,
      });
    }

    Promise.all([courseQuery, Course.countDocumentsDeleted()])
      .then(([courses, deletedCount]) =>
        res.render("me/view-counts", {
          deletedCount,
          courses: multipleMongooseToObject(courses),
        })
      )
      .catch(next);
  }

  test(req, res, next) {
    let courseQuery = Products.find({});

    if (req.query.hasOwnProperty("_sort")) {
      courseQuery = courseQuery.sort({
        [req.query.column]: req.query.type,
      });
    }

    Promise.all([courseQuery])
      .then(([products, deletedCount]) =>
        res.render("me/view-counts", {
          deletedCount,
          products: multipleMongooseToObject(products),
        })
      )
      .catch(next);
  }
}

module.exports = new meController();
