"""
Expense Tracker - Backend API
A simple Flask REST API for tracking personal expenses
"""

from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from datetime import datetime
import sqlite3
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

DATABASE = 'expenses.db'


def get_db_connection():
    """Create a database connection"""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row  # Return rows as dictionaries
    return conn


def init_db():
    """Initialize the database with expense table"""
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            amount REAL NOT NULL,
            category TEXT NOT NULL,
            date TEXT NOT NULL,
            description TEXT
        )
    ''')
    conn.commit()
    conn.close()


@app.route('/')
def index():
    """Serve the frontend page"""
    return render_template('index.html')


@app.route('/api/expenses', methods=['GET'])
def get_expenses():
    """Get all expenses"""
    conn = get_db_connection()
    expenses = conn.execute('SELECT * FROM expenses ORDER BY date DESC').fetchall()
    conn.close()
    
    return jsonify([dict(expense) for expense in expenses])


@app.route('/api/expenses', methods=['POST'])
def add_expense():
    """Add a new expense"""
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['title', 'amount', 'category', 'date']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    
    try:
        conn = get_db_connection()
        cursor = conn.execute(
            'INSERT INTO expenses (title, amount, category, date, description) VALUES (?, ?, ?, ?, ?)',
            (data['title'], data['amount'], data['category'], data['date'], data.get('description', ''))
        )
        conn.commit()
        expense_id = cursor.lastrowid
        conn.close()
        
        return jsonify({'id': expense_id, 'message': 'Expense added successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/expenses/<int:expense_id>', methods=['DELETE'])
def delete_expense(expense_id):
    """Delete an expense by ID"""
    conn = get_db_connection()
    conn.execute('DELETE FROM expenses WHERE id = ?', (expense_id,))
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Expense deleted successfully'}), 200


@app.route('/api/expenses/<int:expense_id>', methods=['PUT'])
def update_expense(expense_id):
    """Update an expense by ID"""
    data = request.get_json()
    
    conn = get_db_connection()
    conn.execute(
        'UPDATE expenses SET title = ?, amount = ?, category = ?, date = ?, description = ? WHERE id = ?',
        (data['title'], data['amount'], data['category'], data['date'], data.get('description', ''), expense_id)
    )
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Expense updated successfully'}), 200


@app.route('/api/summary', methods=['GET'])
def get_summary():
    """Get expense summary statistics"""
    conn = get_db_connection()
    
    # Total expenses
    total = conn.execute('SELECT SUM(amount) as total FROM expenses').fetchone()
    
    # Expenses by category
    by_category = conn.execute(
        'SELECT category, SUM(amount) as total FROM expenses GROUP BY category'
    ).fetchall()
    
    # Monthly expenses (current month)
    current_month = datetime.now().strftime('%Y-%m')
    monthly = conn.execute(
        'SELECT SUM(amount) as total FROM expenses WHERE date LIKE ?',
        (f'{current_month}%',)
    ).fetchone()
    
    conn.close()
    
    return jsonify({
        'total': total['total'] if total['total'] else 0,
        'monthly': monthly['total'] if monthly['total'] else 0,
        'by_category': [dict(cat) for cat in by_category]
    })


if __name__ == '__main__':
    # Initialize database on startup
    init_db()
    print("🚀 Starting Expense Tracker API...")
    print("📊 Database initialized")
    app.run(debug=True, port=5000)
