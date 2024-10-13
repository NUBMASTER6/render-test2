const express = require('express');
const path = require('path');

const app = express();

// Middleware to set UTF-8 encoding for HTML and CSS files


// Serve static files from the current directory

app.use(express.static(path.join(__dirname, 'public')));

// Route the root URL '/' to 'login-auth-1.html'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login-auth-1.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Static server is running on http://localhost:${PORT}`);
});