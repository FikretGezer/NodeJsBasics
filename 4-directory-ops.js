const fs = require('fs');

if(!fs.existsSync('./newDirectory'))
{
    fs.mkdir('./newDirectory', (err) => {
        if(err)
        {
            console.log(err);
            return;
        }
        console.log('File created...');
    });
}
if(fs.existsSync('./newDirectory'))
{
    fs.rmdir('./newDirectory', (err) => {
        if(err)
        {
            console.log(err);
            return;
        }
        console.log('File deleted...');
    })
}