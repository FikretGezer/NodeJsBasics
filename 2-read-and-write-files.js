const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;

const fileOps = async() => {
    try{
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'newReply.txt'), 'utf-8');
        console.log('First data: ' + data);
        await fsPromises.unlink(path.join(__dirname, 'files', 'newReply.txt'));
        await fsPromises.writeFile(path.join(__dirname, 'files', 'promises.txt'), data)
        await fsPromises.appendFile(path.join(__dirname, 'files', 'promises.txt'), "\n\nappending...");
        await fsPromises.rename(path.join(__dirname, 'files', 'promises.txt'), path.join(__dirname, 'files', 'ultimatePromises.txt'));
        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'ultimatePromises.txt'), 'utf-8');
        console.log(newData);
    }catch(err)
    {
        console.log(err);
    }
};
fileOps();


// const firstFilePath = path.join(__dirname, 'files', 'first.txt');
// fs.readFile(firstFilePath, 'utf-8', (err, data) => {
//     if(err) throw err;
//     console.log(data);
// });

// console.log('Hey...');

// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Heyy', (err) => {
//     if(err) throw err;
//     console.log('writing compeleted');
// });

// fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\nHeyy', (err) => {
//     if(err) throw err;
//     console.log('append compeleted');
// });

// fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newReply.txt'), (err) => {
//     if(err) throw err;
//     console.log('renaming compeleted');
// });

// process.on('uncaughtException', err => {
//     console.error('There was an uncaught ' + err);
//     process.exit(1);
// });