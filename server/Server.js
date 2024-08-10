const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = 3001;
const saltRounds = 10; // Salt rounds for bcrypt

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
app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the user into the 'users' table
    db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], function(err) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while signing up' });
      } else {
        res.json({ message: 'User signed up successfully' });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while signing up' });
  }
});

// Define an API endpoint for user login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Query the database to find a user with the provided username
  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, row) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while logging in' });
    } else if (row) {
      try {
        // Compare the provided password with the hashed password in the database
        const match = await bcrypt.compare(password, row.password);
        if (match) {
          res.json({ message: 'Login successful', user: row });
        } else {
          res.status(401).json({ error: 'Incorrect password' });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while logging in' });
      }
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
