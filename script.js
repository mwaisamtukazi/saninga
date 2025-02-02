// script.js

let totalIncome = 0;
let totalExpenses = 0;
let expenses = [];

// Create a chart for displaying real-time expenditures by category
const ctx = document.getElementById('expenditureChart').getContext('2d');
const expenditureChart = new Chart(ctx, {
    type: 'pie', // Pie chart to show distribution of expenditures by category
    data: {
        labels: ['Food', 'Transport', 'Entertainment', 'Utilities', 'Other'],
        datasets: [{
            label: 'Expenses',
            data: [0, 0, 0, 0, 0], // Initial empty data
            backgroundColor: ['#ff5733', '#33b5ff', '#ffcc00', '#aaff33', '#ff3399'],
            borderColor: ['#fff', '#fff', '#fff', '#fff', '#fff'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return `${tooltipItem.label}: Tsh ${tooltipItem.raw.toFixed(2)}`;
                    }
                }
            }
        }
    }
});

let expenseData = {
    food: 0,
    transport: 0,
    entertainment: 0,
    utilities: 0,
    other: 0
};

// Function to set monthly income
function setIncome() {
    totalIncome = parseFloat(document.getElementById('income').value);
    document.getElementById('totalIncome').innerText = `Tsh ${totalIncome.toFixed(2)}`;
    updateBalance();
}

// Function to add an expense
function addExpense() {
    let expenseAmount = parseFloat(document.getElementById('expenseAmount').value);
    let category = document.getElementById('category').value;

    if (isNaN(expenseAmount) || expenseAmount <= 0) {
        alert('Please enter a valid amount for the expense.');
        return;
    }

    expenses.push({ amount: expenseAmount, category: category });
    expenseData[category] += expenseAmount;
    totalExpenses += expenseAmount;

    document.getElementById('totalExpenses').innerText = `Tsh ${totalExpenses.toFixed(2)}`;
    updateBalance();
    updateExpenseList();
    suggestSavings();
    updateGraph();
}

// Function to update balance
function updateBalance() {
    let balance = totalIncome - totalExpenses;
    document.getElementById('balance').innerText = `Tsh ${balance.toFixed(2)}`;

    let percentageSpent = (totalExpenses / totalIncome) * 100;
    document.getElementById('expensePercentage').innerText = `${percentageSpent.toFixed(2)}%`;
}

// Function to display the expense list
function updateExpenseList() {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';

    expenses.forEach((expense, index) => {
        let li = document.createElement('li');
        li.innerText = `${expense.category} - Tsh ${expense.amount.toFixed(2)}`;
        expenseList.appendChild(li);
    });
}

// AI-based suggestion to save more
function suggestSavings() {
    let suggestionText = '';
    let savingsGoal = totalIncome * 0.2; // 20% savings goal

    if (totalExpenses > savingsGoal) {
        suggestionText = "You're spending too much! Try to save at least 20% of your income.";
    } else {
        suggestionText = "Great job! You're on track with your savings.";
    }

    document.getElementById('aiSuggestion').innerText = suggestionText;
}

// Update the graph with real-time expenditures data
function updateGraph() {
    expenditureChart.data.datasets[0].data = [
        expenseData.food,
        expenseData.transport,
        expenseData.entertainment,
        expenseData.utilities,
        expenseData.other
    ];
    expenditureChart.update();
}
