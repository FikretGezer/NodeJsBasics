const {v4: uuid} = require('uuid');
const { format } = require('date-fns');
const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;

const logEvents = async(message, logName) => {
    const dateTime = format(new Date(), 'dd/MM/yyyy\tHH:mm:ss');
    const logItem = `${dateTime}\t${uuid()}\t${message}`;
    try {
        if(!fs.existsSync(path.join(__dirname, '..', './logs')))
        {
            await fs.mkdir(path.join(__dirname, '..', './logs'), err =>{
                if(err)
                {
                    console.log(err);
                    return;
                }
            });
        }
        await fsPromises.appendFile(path.join(__dirname, '..', './logs', logName), logItem);


    } catch {
        if(err)
            console.log(err);
    }
};
const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    next();
}

module.exports = { logger, logEvents };
