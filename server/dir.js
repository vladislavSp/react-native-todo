const fs = require('fs');

// Проверяет существует ли папка и если нет - создает ее
if (!fs.existsSync('./new')) {
    fs.mkdir('./new', (err) => {
        if (err) throw err;
        console.log('Directory created');
    })
}

// Проверяет существует ли папка, если да - удаляет ее
if (fs.existsSync('./new')) {
    fs.rmdir('./new', (err) => {
        if (err) throw err;
        console.log('Directory removed');
    })
}