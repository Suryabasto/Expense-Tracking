// Expense Tracker - Frontend JavaScript
// Handles all API interactions and UI updates

const API_URL = 'http://localhost:5000/api';

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTodayDate();
    loadExpenses();
    loadSummary();
    
    // Add form submit handler
    document.getElementById('expenseForm').addEventListener('submit', handleAddExpense);
});

/**
 * Set today's date as default in the date input
 */
function setTodayDate() {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
}

/**
 * Handle form submission to add a new expense
 */
async function handleAddExpense(e) {
    e.preventDefault();
    
    const expenseData = {
        title: document.getElementById('title').value,
        amount: parseFloat(document.getElementById('amount').value),
        category: document.getElementById('category').value,
        date: document.getElementById('date').value,
        description: document.getElementById('description').value
    };
    
    try {
        const response = await fetch(`${API_URL}/expenses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expenseData)
        });
        
        if (response.ok) {
            // Reset form
            document.getElementById('expenseForm').reset();
            setTodayDate();
            
            // Reload data
            loadExpenses();
            loadSummary();
            
            showNotification('Expense added successfully!', 'success');
        } else {
            showNotification('Failed to add expense', 'error');
        }
    } catch (error) {
        console.error('Error adding expense:', error);
        showNotification('Error adding expense', 'error');
    }
}

/**
 * Load all expenses from the API
 */
async function loadExpenses() {
    try {
        const response = await fetch(`${API_URL}/expenses`);
        const expenses = await response.json();
        
        displayExpenses(expenses);
    } catch (error) {
        console.error('Error loading expenses:', error);
        showNotification('Error loading expenses', 'error');
    }
}

/**
 * Display expenses in the UI
 */
function displayExpenses(expenses) {
    const expensesList = document.getElementById('expensesList');
    
    if (expenses.length === 0) {
        expensesList.innerHTML = '<div class="no-expenses">No expenses yet. Add your first expense!</div>';
        return;
    }
    
    expensesList.innerHTML = expenses.map(expense => `
        <div class="expense-item">
            <div class="expense-info">
                <div class="expense-title">${expense.title}</div>
                <div class="expense-details">
                    <span class="category-badge category-${expense.category}">${expense.category}</span>
                    ${formatDate(expense.date)}
                    ${expense.description ? ` • ${expense.description}` : ''}
                </div>
            </div>
            <div class="expense-amount">$${expense.amount.toFixed(2)}</div>
            <div class="expense-actions">
                <button class="btn-small btn-delete" onclick="deleteExpense(${expense.id})">🗑️</button>
            </div>
        </div>
    `).join('');
}

/**
 * Load expense summary statistics
 */
async function loadSummary() {
    try {
        const response = await fetch(`${API_URL}/summary`);
        const summary = await response.json();
        
        document.getElementById('totalExpenses').textContent = `$${summary.total.toFixed(2)}`;
        document.getElementById('monthlyExpenses').textContent = `$${summary.monthly.toFixed(2)}`;
        
        // Get total items count
        const expensesResponse = await fetch(`${API_URL}/expenses`);
        const expenses = await expensesResponse.json();
        document.getElementById('totalItems').textContent = expenses.length;
        
    } catch (error) {
        console.error('Error loading summary:', error);
    }
}

/**
 * Delete an expense by ID
 */
async function deleteExpense(id) {
    if (!confirm('Are you sure you want to delete this expense?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/expenses/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            loadExpenses();
            loadSummary();
            showNotification('Expense deleted successfully!', 'success');
        } else {
            showNotification('Failed to delete expense', 'error');
        }
    } catch (error) {
        console.error('Error deleting expense:', error);
        showNotification('Error deleting expense', 'error');
    }
}

/**
 * Format date to a readable format
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Show a notification message
 */
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#00b894' : '#d63031'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
