const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");

const Schema = mongoose.Schema;
// const removeAccent = require("../util/removeAccent");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    stock: {
      type: Number,
      required: false,
      default: 10,
    },
    price: {
      type: String,
      default: 0,
    },
    size: {
      type: [String],
      required: false,
      default: ["M", "L"],
    },
    productType: {
      main: String,
      sub: String,
    },
    color: {
      type: [String],
      required: false,
      default: ["xanh", "do"],
    },
    pattern: {
      type: [String],
      required: false,
      default: ["giay", "go"],
    },
    tags: {
      type: [String],
      required: false,
      default: ["ielts"],
    },
    images: {
      type: [String],
    },
    dateAdded: {
      type: Date,
      required: false,
      default: Date.now,
    },
    isSale: {
      status: {
        type: Boolean,
        default: false,
      },
      percent: {
        type: Number,
        default: 0,
      },
      end: {
        type: Date,
      },
    },
    ofSellers: {
      userId: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "User",
      },
      name: String,
    },
    labels: {
      type: String,
      required: false,
      default: "Shiro",
    },
    materials: {
      type: [String],
      required: false,
      default: ["ha"],
    },
    buyCounts: {
      type: Number,
      required: false,
      default: 0,
    },
    viewCounts: {
      type: Number,
      default: 0,
    },
    rating: {
      byUser: String,
      content: String,
      star: Number,
    },
    index: {
      type: Number,
      default: 0,
    },
    comment: {
      total: {
        type: Number,
        require: false,
        default: 0,
      },
      items: [
        {
          title: {
            type: String,
          },
          content: {
            type: String,
          },
          name: {
            type: String,
          },
          date: {
            type: Date,
            default: Date.now,
          },
          star: {
            type: Number,
          },
        },
      ],
    },
    slug: { type: String, slug: "name", unique: true },
  },
  {
    timestamps: true,
  }
);

const index = {
  name: "text",
  description: "text",
  labels: "text",
  "productType.main": "text",
  tags: "text",
  ofSellers: "text",
};
productSchema.index(index);

// productSchema.methods.getNonAccentType = function () {
//   return removeAccent(this.productType.main);
// };

mongoose.plugin(slug);
productSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
