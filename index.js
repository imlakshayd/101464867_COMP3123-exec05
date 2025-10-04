const express = require('express');
const app = express();
const userRouter = require('./routes/users'); // Import User Router
const path = require('path'); // To serve static html file

// Add middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount the user router at /api/v1/user
app.use('/api/v1/user', userRouter);

// Create home route to send home.html file
app.get('/home', (req,res, next) => {
  const filePath = path.join(__dirname, '/home.html'); // Construct the file path
  res.sendFile(filePath, (err) => { // Send the file;
    if (err) {
      next(err); // Pass errors to the error handler
    }
});
});

// Error handling middleware
app.use((err,req,res,next) => {
  console.error('[ERROR]', err.stack);
  res.status(500).send('Server Error');
});

app.use((req,res,next) => {
  res.status(404).send('Resource Not Found');
});

// Start the server
app.listen(process.env.port || 8081); //Use uppercase "PORT" dynamic port binding in production environments

console.log('Web Server is listening at port '+ (process.env.port || 8081)); 
console.log("http://localhost:"+ (process.env.port || 8081) + "/home"); 