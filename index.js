const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));



// Routes
const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
const getKitRouter = require('./routes/getKit');
const faqRouter = require('./routes/faq');
const contactRouter = require('./routes/contact');
const registerRouter = require('./routes/register');
const submitDonorRouter = require('./routes/submit-donor');
const requestKitRouter = require('./routes/requestkit'); // Corrected variable name
const loginRouter = require('./routes/login'); // Login route
const createAccountRouter = require('./routes/create-account'); // Create account route
app.use('/', indexRouter);
app.use('/', aboutRouter); // Unique paths
app.use('/', getKitRouter);
app.use('/', faqRouter);
app.use('/', contactRouter);
app.use('/', registerRouter);
app.use('/submit-donor', submitDonorRouter);
app.use('/request-kit', requestKitRouter); // Unique path for requestKit
app.use('/', loginRouter); // Login route
app.use('/', createAccountRouter); // Create account route

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});