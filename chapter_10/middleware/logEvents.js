const { format } = require('date-fns');
const { v4: uuid } =  require('uuid');
const fs = require('fs');
const promises = fs.promises;
const path = require('path');

const logEvents = async(message, logName) => {
    const dateTime = `${format(new Date(), 'dd/MM/yyyy\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    console.log(logItem);
    try{
        if(!fs.existsSync(path.join(__dirname, '..', './logs')))
        {
            await fs.mkdir(path.join(__dirname, '..', './logs') , err => {
                if(err)
                {
                    console.log(err);
                    return;
                }
            });
        }

        await promises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem);

    } catch {
        if(err)
        {
            console.log(err);
        }
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method},\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log(`${req.method},\t${req.path}`);
    next();
}

module.exports = {logEvents, logger};
