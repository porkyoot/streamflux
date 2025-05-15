
const socket = io();
const weightSpan = document.getElementById("weight");
const fullnessBar = document.getElementById("fullness");
const foodListEl = document.getElementById("foodList");
const totalCaloriesEl = document.getElementById("totalCalories");

socket.on("update", (state) => {
  weightSpan.textContent = state.weight;
  fullnessBar.value = state.fullness;
  foodListEl.innerHTML = '';
  let totalCalories = 0;
  state.food.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.qty}× ${item.icon} (${item.kcal * item.qty} kcal)`;
    totalCalories += item.kcal * item.qty;
    foodListEl.appendChild(li);
  });
  totalCaloriesEl.textContent = totalCalories;
});
