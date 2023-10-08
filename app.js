const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

// Create a MySQL connection
const db = mysql.createConnection({
  host: '34.173.192.47',
  user: 'root',
  password: 'asdf',
  database: 'mydb'
});

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (CSS, images)
app.use(express.static(__dirname + '/public'));

// Use EJS for rendering views
app.set('view engine', 'ejs');

// Define routes

// Home page
app.get('/', (req, res) => {
  res.render('login');
});

// Login POST request
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
      }

      if (results.length === 1) {
        res.render('welcome', { username });
      } else {
        res.render('login', { error: 'Invalid username or password' });
      }
    }
  );
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
