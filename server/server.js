require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const credentials = require('./middleware/credentials');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnect');
const requestDownload = require('./axios/axios');
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();
// requestDownload();

// custom middleware logger
app.use(logger);

// credentials check before CORS
// and fetch cookies credentials requirement
app.use(credentials);

// Cors middleware - Cross Origin Resourse Sharing
app.use(cors(corsOptions));

// Middleware for the formdata, json, static files, styles, images
app.use(express.urlencoded({ extended: false }));
// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// auto search static files in public folder
app.use(express.static(path.join(__dirname, '/public')));

//routes
app.use('/', require('./routes/root')); // connect routes for the main page
app.use('/register', require('./routes/register')); // connect routes for the register
app.use('/auth', require('./routes/auth')); // connect routes for the register
app.use('/refresh', require('./routes/refresh')); // connect r for the refresh token
app.use('/logout', require('./routes/logout')); // connect r for the logout

app.use('/leagues', require('./routes/api/league')); // connect routes for the api

// redirect unregistered routes and check file-types
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({
            error: 'Not find JSON-file',
        })
    } else {
        res.type('txt').send('404 Not Found!');
    }
});

app.use(errorHandler);

// listener mongodb
mongoose.connection.once('open', () => {
    console.log('Connect to MongoDB...');
    app.listen(PORT, () => console.log(`Server running on port:${PORT} - http://localhost:${PORT}`));
});
