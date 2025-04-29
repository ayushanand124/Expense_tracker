// Select elements
const expenseForm = document.getElementById("expense-form");
const expenseNameInput = document.getElementById("expense-name");
const expenseAmountInput = document.getElementById("expense-amount");
const expenseList = document.getElementById("expense-list");
const totalAmount = document.getElementById("total-amount");

// Retrieve expenses from local storage or initialize
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Function to render expenses
function renderExpenses() {
  expenseList.innerHTML = ""; // Clear the list
  let total = 0;

  expenses.forEach((expense, index) => {
    total += parseFloat(expense.amount);

    const li = document.createElement("li");
    li.innerHTML = `
      ${expense.name} - $${expense.amount}
      <button class="delete-btn" data-index="${index}">X</button>
    `;

    expenseList.appendChild(li);
  });

  totalAmount.textContent = total.toFixed(2);
}

// Function to add an expense
function addExpense(name, amount) {
  expenses.push({ name, amount });
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}

// Function to delete an expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}

// Event: Add expense
expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = expenseNameInput.value.trim();
  const amount = parseFloat(expenseAmountInput.value);

  if (name && amount > 0) {
    addExpense(name, amount);
    expenseNameInput.value = "";
    expenseAmountInput.value = "";
  }
});

// Event: Delete expense (using event delegation)
expenseList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.getAttribute("data-index");
    deleteExpense(index);
  }
});

// Initial render
renderExpenses();
