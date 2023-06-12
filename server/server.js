const express = require('express');
const config = require('./config/config');
const todoRoutes = require('./routes/todos');

//require passport and JWT Strategy for auth
const passport = require('passport');

//use of JWT token
const passportJWT = require('./config/passport-jwt-strategy');

// Create Express app
const app = express();

// Middleware
app.use(express.json());

app.use(passport.initialize());

// Routes
app.use('/api/todos', todoRoutes);

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
