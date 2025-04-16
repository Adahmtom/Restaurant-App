/*********************************************************************************
 * * ITE5315 – Project * I declare that this assignment is my own work in accordance with Humber Academic Policy. *
 * No part of this assignment has been copied manually or electronically from any other source * (including web sites) or distributed to other students. *
 *  * Name: AHMAD ADEBOYE Student ID: N01655680 &   ** Name: MEENAKASHI DEVI Student ID: N01663549 Date: APRIL 9TH, 2025
 ***************************************/

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const db = require('./restaurantDB');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));


const HTTP_PORT = process.env.PORT || 3000;
console.log("MONGO_URI:", process.env.MONGO_URI);


db.initialize(process.env.MONGO_URI)
  .then(() => {
    app.listen(HTTP_PORT, () => console.log(`Server listening on port ${HTTP_PORT}`));
  })
  .catch(err => console.log(err));

// API ROUTES
app.post('/api/restaurants', async (req, res) => {
  try {
    const newRest = await db.addNewRestaurant(req.body);
    res.status(201).json(newRest);
  } catch {
    res.status(500).json({ message: 'Unable to add restaurant' });
  }
});

app.get('/api/restaurants', async (req, res) => {
  const { page, perPage, borough } = req.query;
  try {
    const data = await db.getAllRestaurants(Number(page), Number(perPage), borough);
    res.json(data);
  } catch {
    res.status(500).json({ message: 'Unable to fetch restaurants' });
  }
});

app.get('/api/restaurants/:id', async (req, res) => {
  try {
    const data = await db.getRestaurantById(req.params.id);
    res.json(data);
  } catch {
    res.status(500).json({ message: 'Unable to find restaurant' });
  }
});

app.put('/api/restaurants/:id', async (req, res) => {
  try {
    await db.updateRestaurantById(req.body, req.params.id);
    res.status(204).send();
  } catch {
    res.status(500).json({ message: 'Unable to update restaurant' });
  }
});

app.delete('/api/restaurants/:id', async (req, res) => {
  try {
    await db.deleteRestaurantById(req.params.id);
    res.status(204).send();
  } catch {
    res.status(500).json({ message: 'Unable to delete restaurant' });
  }
});
