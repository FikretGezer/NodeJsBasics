const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const {logEvents, logger} = require('./middleware/logEvents')
const errorHandler = require('./middleware/errorHandler')
const PORT = process.env.PORT || 3500;


// custom middleware logger
app.use(logger);

// cross origin resource sharing
const whiteList = ['https://www.google.com', 'http://127.0.0.1:5500', 'http://localhost:3500'];
const corsOptions = {
    origin: (origin, callback) => {
        console.log(origin);
        if(whiteList.indexOf(origin) !== -1 || !origin){
            callback(null, true);
        } else {
            callback(new Error('Not allowed by cors'));
        }
    },
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));


// built-in middleware to handle urlencoded data
// in other words, form data:
// 'content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({extendend:false}));

// built-in middleware for json
app.use(express.json());

//serve static files
app.use(express.static(path.join(__dirname, '/public')));




app.get('^/$|/index(.html)?', (req, res) => {
    // res.sendFile('./views/index.html', { root: __dirname })
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.get('^/$|/index(.html)?/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});
app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});
app.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page'); // changed status code 301 (default is 302)
});

// Route handlers
app.get('/hello(.html)?', (req, res, next) => {
    console.log('attempted to load hello.html');
    next();
}, (req, res) => {
    res.send('hello world');
});

const one = (req, res, next) => {
    console.log('one');
    next();
}
const two = (req, res, next) => {
    console.log('two');
    next();
}
const three = (req, res, next) => {
    console.log('three');
    res.send('Finished');
}

app.get('/chain(.html)?', [one, two, three]);

app.all('*', (req, res) => {

    res.status(404);

    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
    else if(req.accepts('json')) {
        res.json({error: "404 Not Found"});
    }
    else
    {
        res.type('txt').send("404 Not Found");
    }

});


app.use(errorHandler);

app.listen(PORT, () => console.log('listening at ' + PORT));