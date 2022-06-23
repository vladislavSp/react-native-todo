const fs = require('fs');

// Потоки чтения и запииси файлов
const rs = fs.createReadStream('./files/bigFile.txt', { encoding: 'utf8' });
const ws = fs.createWriteStream('./files/new-bigFile.txt');

// Чтение большого файла с помощью стрима и создание нового (по сути копирование)
rs.pipe(ws);