
const socket = io();
let state = {
  weight: '???',
  fullness: 0,
  food: []
};

function addFood() {
  const icon = document.getElementById("inputFoodIcon").value;
  const qty = parseInt(document.getElementById("inputFoodQty").value, 10);
  const kcal = parseInt(document.getElementById("inputFoodKcal").value, 10);
  if (!icon || isNaN(qty) || isNaN(kcal)) return;
  state.food.push({ icon, qty, kcal });
  renderFoodList();
  socket.emit("setState", state);
}

function renderFoodList() {
  const list = document.getElementById("foodList");
  list.innerHTML = '';
  state.food.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.qty}× ${item.icon} (${item.kcal} kcal/item)`;
    list.appendChild(li);
  });
}

function updateState() {
  const weight = parseFloat(document.getElementById("inputWeight").value);
  const fullness = parseInt(document.getElementById("inputFullness").value, 10);
  if (!isNaN(weight)) state.weight = weight;
  if (!isNaN(fullness)) state.fullness = fullness;
  socket.emit("setState", state);
}

document.getElementById("inputWeight").addEventListener("input", updateState);
document.getElementById("inputFullness").addEventListener("input", updateState);
