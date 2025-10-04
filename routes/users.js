// User Routes
const express = require('express');
const routerUser = express.Router(); // Create Router instance
const user = require('../user.json'); // Import user data from JSON file

// Define routes for user
routerUser.get('/profile', (req,res) => {
  res.json(user);
});

// Login route with detailed checks
// This way we are telling user which one is wrong username or password and an attacker can guess easily
routerUser.post('/login', (req, res) => {
  if (req.body.username === user.username) { // Check username first using strict equality 
    if (req.body.password === user.password) { // Then check password using strict equality
      res.json({
        status: true,
        message: "User Is Valid"
      });
    } else {
      res.json({
        status: false,
        message: "Password Is Invalid"
      });
    }
  } else {
    res.json({
      status: false,
      message: "Username Is Invalid"
    });
  }
}); 

// Alternative way and secure way to do login - Combined check = less information leakage = more secure
// By this way we are not telling user which one is wrong username or password and an attacker cannot guess easily

// router.post('/login', (req,res) => {
//   if(req.body.username === user.username && req.body.password === user.password){
//     res.json({
//       status: true,
//       message: "Logic is successful"
//     });
//   } else {
//     res.json({
//       status: false,
//       message: "Login failed"
//     });
//   }
// });

// Logout route
routerUser.get('/logout/:username', (req,res) => {
  res.send(`<b>${req.params.username} successfully logout.<b>`); // Using template literals to embed username in response
});

// Export the router
module.exports = routerUser;