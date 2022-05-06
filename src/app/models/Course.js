const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;

const Course = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    // videoID: { type: String, required: true },
    slug: { type: String, slug: "name", unique: true },
    price: { type: String, default: 0 },
    viewCounts: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

// Add plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("Course", Course);
