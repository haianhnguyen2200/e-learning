const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/test");
    console.log("Successful");
  } catch (error) {
    console.log("Failed");
  }
}

module.exports = { connect };
