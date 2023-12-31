const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logEvents, logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500;

app.use(logger);


const whiteList = ['https://www.google.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];
const corsOptions = {
    origin: (origin, callback) => {
        console.log(origin);
        if(whiteList.indexOf(origin) !== -1 || !origin)
            callback(null, true);
        else
            callback(new Error('Not allowed by cors'));
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));


app.get('^/$|index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});
app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page');
});

app.get('/hello(.html)?', (req, res, next) => {
    next();
},(req, res) => {
    res.send('Main Page');
});

app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
    else if(req.accepts('json')){
        res.json({error:'404 Not Found'});
    }
    else{
        res.type('txt').send('404 Not Found');
    }

});

app.use(errorHandler);

app.listen(PORT, () => console.log('Listening at port ' + PORT));