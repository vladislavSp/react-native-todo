// const os = require('os');
// const path = require('path');

// console.log(os.type());
// console.log(os.homedir());
// console.log(__dirname);
// console.log(__filename);

// console.log(path.dirname(__filename));
// console.log(path.basename(__filename));
// console.log(path.parse(__filename));

// Чтение файла БЕЗ ПРОМСОВ 'start.txt', 2-м параметром идет кодировка и 3-м callback
// fs.readFile(path.join(__dirname, 'files', 'start.txt'), 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });

// ПЕРЕХВАТ НЕОБРАБОТАННОЙ ОШИБКИ
// process.on('uncaughtException', err => {
//     console.error(`There was an uncaught error: ${err}`);
//     process.exit(1);
// })


// Запись в файл 'reply.txt', информации 'Nice to meet you!' и затем callback
// но такая запись превращается в ад-коллбэков - поэтому нужны промисы
// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), ' Nice to meet you!', (err) => {
//     if (err) throw err;
//     console.log('Operation write complete!');

//     fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), ' Append text!', (err) => {
//         if (err) throw err;
//         console.log('Append complete!');

//         fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newReply.txt'), (err) => {
//             if (err) throw err;
//             console.log('Rename complete!');
//         });
//     });
// });

// Изменение/добавление в файл
// fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), ' Append text!', (err) => {
//     if (err) throw err;
//     console.log('Append complete!');
// });

// Переименовать файл - аналогично
// fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newReply.txt'), (err) => {
//     if (err) throw err;
//     console.log('Rename complete!');
// });


//// FILE SYSTEMS
const fs = require('fs');
const fsPromises = require('fs/promises'); // или requare('fs').promises
const path = require('path');

const fileOps = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'start.txt'), 'utf8');
        console.log(data);

        await fsPromises.unlink(path.join(__dirname, 'files', 'start.txt'));

        await fsPromises.writeFile(path.join(__dirname, 'files', 'promiseFile.txt'), data);
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promiseFile.txt'), '\n\nNice to meet you!');
        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'promiseFile.txt'), 'utf8');

        console.log(newData);
    } catch (e) {
        console.error(e);
    }
};

fileOps();
