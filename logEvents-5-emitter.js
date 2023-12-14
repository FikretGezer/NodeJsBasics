const { format } = require('date-fns');
const { v4: uuid } =  require('uuid');
const fs = require('fs');
const promises = fs.promises;
const path = require('path');

const logEvents = async(message) => {
    const dateTime = `${format(new Date(), 'dd/MM/yyyy\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    console.log(logItem);
    try{
        if(!fs.existsSync(path.join(__dirname, './logs')))
        {
            await fs.mkdir(path.join(__dirname, './logs') , err => {
                if(err)
                {
                    console.log(err);
                    return;
                }
            });
        }
        await promises.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), logItem);

    } catch {
        if(err)
        {
            console.log(err);
        }
    }
}

console.log(format(new Date(), 'dd/MM/yyyy\tHH:mm:ss'));
console.log(uuid());

module.exports = logEvents;