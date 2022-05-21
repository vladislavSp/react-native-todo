const whitelist = [
    'https://www.mysite.com',
    'http://127.0.0.1:3000',
    'http://localhost:3500/',
    'https://www.google.com',
    'http://127.0.0.1:3500',
];

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

module.exports = corsOptions;
