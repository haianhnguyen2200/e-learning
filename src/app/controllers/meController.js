const Course = require("../models/Course");
const Users = require("../models/user");
const Order = require("../models/order");
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
    Products.findDeleted({})
      .then((products) =>
        res.render("me/trash-courses", {
          products: multipleMongooseToObject(products),
        })
      )
      .catch(next);
  }

  viewCounts(req, res, next) {
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

  getUsers(req, res, next) {
    let courseQuery = Users.find({});

    if (req.query.hasOwnProperty("_sort")) {
      courseQuery = courseQuery.sort({
        [req.query.column]: req.query.type,
      });
    }

    Promise.all([courseQuery])
      .then(([users, deletedCount]) =>
        res.render("me/users", {
          deletedCount,
          users: multipleMongooseToObject(users),
        })
      )
      .catch(next);
  }

  turnover(req, res, next) {
    let courseQuery = Order.find({});

    if (req.query.hasOwnProperty("_sort")) {
      courseQuery = courseQuery.sort({
        [req.query.column]: req.query.type,
      });
    }

    Promise.all([courseQuery])
      .then(([orders, deletedCount]) =>
        res.render("me/turnover", {
          deletedCount,
          orders: multipleMongooseToObject(orders),
        })
      )
      .catch(next);
  }
}

module.exports = new meController();
