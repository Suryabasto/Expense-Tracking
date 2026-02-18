# 💰 Expense Tracker Application

A simple yet powerful expense tracking web application built with Python Flask backend and vanilla JavaScript frontend. This application helps you manage your personal finances by tracking expenses, categorizing them, and providing insightful summaries.

## 🎯 Real-World Problem

Many people struggle to keep track of their daily expenses and understand where their money goes each month. This application solves that problem by providing an easy-to-use interface for:
- Recording expenses quickly
- Categorizing spending habits
- Viewing expense summaries and statistics
- Managing financial data in one place

## ✨ Features

### Backend (Flask REST API)
- **RESTful API** with full CRUD operations
- **SQLite Database** for persistent data storage
- **Category-based tracking** (Food, Transport, Entertainment, etc.)
- **Summary statistics** (Total, Monthly, By Category)
- **CORS enabled** for frontend-backend communication

### Frontend (HTML/CSS/JavaScript)
- **Modern, responsive UI** with gradient design
- **Real-time updates** after each operation
- **Form validation** for data integrity
- **Visual feedback** with notifications
- **Category badges** with color coding
- **Summary cards** showing key metrics

## 📁 Project Structure

```
expense-tracker/
│
├── app.py                  # Flask backend with API endpoints
├── requirements.txt        # Python dependencies
├── expenses.db            # SQLite database (auto-generated)
│
├── templates/
│   └── index.html         # Frontend HTML with styling
│
└── static/
    └── app.js             # Frontend JavaScript for API interaction
```

## 🚀 Getting Started

### Prerequisites
- Python 3.7 or higher
- pip (Python package manager)

### Installation

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the application:**
   ```bash
   python app.py
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5000`

The database will be automatically created on first run.

## 📊 API Endpoints

### Get All Expenses
```http
GET /api/expenses
Response: List of all expenses
```

### Add New Expense
```http
POST /api/expenses
Body: {
  "title": "Grocery Shopping",
  "amount": 45.50,
  "category": "food",
  "date": "2026-02-18",
  "description": "Weekly groceries"
}
```

### Update Expense
```http
PUT /api/expenses/<id>
Body: Updated expense data
```

### Delete Expense
```http
DELETE /api/expenses/<id>
```

### Get Summary Statistics
```http
GET /api/summary
Response: {
  "total": 1250.00,
  "monthly": 450.00,
  "by_category": [...]
}
```

## 🎨 Categories

The application supports the following expense categories:
- 🍕 **Food** - Groceries, restaurants, dining
- 🚗 **Transport** - Gas, public transport, parking
- 🎬 **Entertainment** - Movies, games, subscriptions
- 💡 **Utilities** - Electricity, water, internet
- 🏥 **Healthcare** - Medical expenses, pharmacy
- 📦 **Other** - Miscellaneous expenses

## 💡 Usage Tips

1. **Add Expenses Daily**: Make it a habit to record expenses as they happen
2. **Use Descriptive Titles**: Help yourself remember what each expense was for
3. **Review Monthly**: Check your monthly total to stay on budget
4. **Categorize Accurately**: Get better insights into your spending patterns

## 🔧 Technical Details

### Backend
- **Framework**: Flask 3.0.0
- **Database**: SQLite3 (built-in)
- **CORS**: Flask-CORS for frontend communication
- **Data Format**: JSON for API responses

### Frontend
- **HTML5** with semantic markup
- **CSS3** with modern gradients and animations
- **Vanilla JavaScript** (no frameworks)
- **Fetch API** for async HTTP requests

## 🌟 Future Enhancements

Potential features for future versions:
- User authentication and multiple accounts
- Budget setting and alerts
- Expense filtering and search
- Data visualization with charts
- Export to CSV/PDF
- Recurring expense support
- Mobile app version

## 📝 License

This project is open source and available for educational purposes.

## 👨‍💻 Development

To modify the application:

1. **Backend changes**: Edit `app.py`
2. **Frontend styling**: Edit `templates/index.html` (CSS in `<style>` section)
3. **Frontend logic**: Edit `static/app.js`

The application uses hot-reload in debug mode, so changes will automatically refresh.

## 🐛 Troubleshooting

**Database locked error:**
- Close any other connections to the database
- Restart the application

**CORS errors:**
- Ensure Flask-CORS is installed
- Check that the API URL in `app.js` matches your server

**Port already in use:**
- Change the port in `app.py`: `app.run(debug=True, port=5001)`
- Update the API_URL in `app.js` accordingly

## 📞 Support

For issues or questions, please review the code comments or modify the application to suit your needs.

---

**Happy Expense Tracking! 💰📊**
