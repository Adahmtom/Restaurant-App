/*********************************************************************************
 * * ITE5315 – Project * I declare that this assignment is my own work in accordance with Humber Academic Policy. *
 * No part of this assignment has been copied manually or electronically from any other source * (including web sites) or distributed to other students. *
 *  * Name: AHMAD ADEBOYE Student ID: N01655680 &   ** Name: MEENAKASHI DEVI Student ID: N01663549 Date: APRIL 9TH, 2025
 ***************************************/

const API_URL = "https://restaurant-app-lvd8.onrender.com/api/restaurants";
const form = document.getElementById("restaurantForm");
const list = document.getElementById("restaurantList");

let editingId = null;

async function fetchRestaurants() {
  const res = await fetch(`${API_URL}?page=1&perPage=10`);
  const data = await res.json();
  renderList(data);
}

function renderList(data) {
  list.innerHTML = "";
  data.forEach(restaurant => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>
        <strong>${restaurant.name}</strong>
        (${restaurant.borough}) – ${restaurant.cuisine}<br>
        <small>ID: ${restaurant._id}</small><br>
        <small>Restaurant ID: ${restaurant.restaurant_id || 'N/A'}</small>
      </span>
      <div>
        <button onclick="editRestaurant('${restaurant._id}', '${restaurant.name}', '${restaurant.borough}', '${restaurant.cuisine}', '${restaurant.restaurant_id || ''}')">✏️ Edit</button>
        <button class="deleteBtn" onclick="deleteRestaurant('${restaurant._id}')">🗑️ Delete</button>
      </div>
    `;
    list.appendChild(li);
  });
}

async function addRestaurant(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const borough = document.getElementById("borough").value;
  const cuisine = document.getElementById("cuisine").value;
  const restaurant_id_input = document.getElementById("restaurant_id").value;

  const restaurant = {
    name,
    borough,
    cuisine
  };

  if (restaurant_id_input) {
    restaurant.restaurant_id = restaurant_id_input;
  } else {
    restaurant.restaurant_id = Math.floor(Math.random() * 1000000).toString();
  }

  if (editingId) {
    // PUT request to update
    await fetch(`${API_URL}/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(restaurant)
    });
    editingId = null;
    form.querySelector("button").textContent = "➕ Add Restaurant";
  } else {
    // POST request to create
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(restaurant)
    });
  }

  form.reset();
  fetchRestaurants();
}

function editRestaurant(id, name, borough, cuisine, restaurant_id) {
  document.getElementById("name").value = name;
  document.getElementById("borough").value = borough;
  document.getElementById("cuisine").value = cuisine;
  document.getElementById("restaurant_id").value = restaurant_id;
  editingId = id;
  form.querySelector("button").textContent = "✅ Update Restaurant";
}

async function deleteRestaurant(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchRestaurants();
}

form.addEventListener("submit", addRestaurant);
fetchRestaurants();
