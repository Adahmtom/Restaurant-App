/*********************************************************************************
 * * ITE5315 – Project * I declare that this assignment is my own work in accordance with Humber Academic Policy. *
 * No part of this assignment has been copied manually or electronically from any other source * (including web sites) or distributed to other students. *
 *  * Name: AHMAD ADEBOYE Student ID: N01655680 &   ** Name: MEENAKASHI DEVI Student ID: N01663549 Date: APRIL 9TH, 2025
 ***************************************/

const mongoose = require("mongoose");

let Restaurant;

const restaurantSchema = new mongoose.Schema({}, { strict: false });

module.exports = {
  initialize: (connectionString) => {
    return new Promise((resolve, reject) => {
      mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
      const db = mongoose.connection;
      db.on("error", reject);
      db.once("open", () => {
        Restaurant = mongoose.model("restaurants", restaurantSchema);
        resolve();
      });
    });
  },
  addNewRestaurant: (data) => new Restaurant(data).save(),
  getAllRestaurants: (page, perPage, borough) => {
    const skip = (page - 1) * perPage;
    const query = borough ? { borough } : {};
    return Restaurant.find(query).sort({ restaurant_id: 1 }).skip(skip).limit(perPage).exec();
  },
  getRestaurantById: (id) => Restaurant.findById(id).exec(),
  updateRestaurantById: (data, id) => Restaurant.updateOne({ _id: id }, data).exec(),
  deleteRestaurantById: (id) => Restaurant.deleteOne({ _id: id }).exec()
};
