const Products = require("../models/product");
const Course = require("../models/Course");
const { mongooseToObject } = require("../../util/mongoose");
const { multipleMongooseToObject } = require("../../util/mongoose");
const Users = require("../models/user");

class coursesController {
  // [GET] /courses/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render("courses/show", {
          course: mongooseToObject(course),
        });
      })
      .catch(next);
  }

  // [GET] /courses/list
  list(req, res, next) {
    Course.find({})
      .then((courses) => {
        res.render("courses/list", {
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }

  // [GET] /courses/create
  create(req, res, next) {
    res.render("courses/create");
  }

  // [POST] /courses/store
  // store(req, res, next) {
  //   const formData = req.body;
  //   formData.image = `https://img.youtube.com/vi/${formData.videoID}/sddefault.jpg`;
  //   const course = new Course(formData);
  //   course
  //     .save()
  //     .then(() => res.redirect("/me/stored/courses"))
  //     .catch((error) => {});
  // }

  store(req, res, next) {
    const formData = req.body;
    const product = new Products(formData);
    product
      .save()
      .then(() => res.redirect("/me/stored/courses"))
      .catch((error) => {});
  }

  // [GET] /courses/:slug/edit
  edit(req, res, next) {
    Products.findOne({ slug: req.params.slug })
      .then((product) => {
        res.render("courses/edit", {
          product: mongooseToObject(product),
        });
      })
      .catch(next);
  }

  // [PUT] /courses/:slug
  update(req, res, next) {
    Products.updateOne({ slug: req.params.slug }, req.body)
      .then(() => res.redirect("/me/stored/courses"))
      .catch(next);
  }

  // [GET] /courses/:slug/edit
  editUser(req, res, next) {
    Users.findOne({ _id: req.params.id })
      .then((user) => {
        res.render("courses/editUser", {
          user: mongooseToObject(user),
        });
      })
      .catch(next);
  }

  // [PUT] /courses/:slug
  updateUser(req, res, next) {
    Users.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/users"))
      .catch(next);
  }

  // [DELETE] /courses/:slug
  delete(req, res, next) {
    Products.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  // [PATCH] /courses/:id/restore
  restore(req, res, next) {
    Products.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  // [FORCE_DELETE] /courses/:id/force
  forceDelete(req, res, next) {
    Products.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  // [POST] /courses/handle-form-actions
  handleFormActions(req, res, next) {
    switch (req.body.action) {
      case "delete":
        Products.delete({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect("back"))
          .catch(next);
        break;
      case "restore":
        Products.restore({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect("back"))
          .catch(next);
        break;
      case "force-delete":
        Products.deleteOne({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect("back"))
          .catch(next);
        break;
      default:
        res.json({ message: "ACTION IS INVALID!" });
    }
  }
}

module.exports = new coursesController();
