const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);


// cors - Cross Origin Resourse Sharing
const whitelist = ['https://www.mysite.com', 'http://127.0.0.1:3000', 'http://localhost:3500/', 'https://www.google.com', 'http://127.0.0.1:3500'];

const corsOptions = {
    origin: (origin, callback) => {
        console.log('Origin: ', origin);
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));


// Middleware для formdata, json, статичный файлов стилей, изображений и тд
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// auto search static files in public folder
app.use(express.static(path.join(__dirname, '/public')));

//'^/$|/index(.html)?' - регулярка для поиска главной страницы
app.get('^/$|/index(.html)?', (req, res) => {
    res.send('Hello Server!'); // sendFile
});


// 301 редирект со старой страницы
app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/file');
});

app.get('/file', (req, res) => {
    res.sendFile(path.join(__dirname, 'files', 'newReply.txt'));
});

// РЕДИРЕКТ НЕЗАРЕГИСТРИРОВАННЫХ МАРШРУТОВ
app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT} - http://localhost:${PORT}`));
