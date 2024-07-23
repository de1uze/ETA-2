const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

// Create a new SQLite database connection
const db = new sqlite3.Database('mydatabase.db');

// Create a 'users' table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL
    )
  `);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define an API endpoint for user registration
app.post('/api/signup', (req, res) => {
  const { username, password } = req.body;

  // Insert the user into the 'users' table
  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], function(err) {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while signing up' });
    } else {
      res.json({ message: 'User signed up successfully' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
