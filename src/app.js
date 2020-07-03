require('dotenv/config');

const express = require('express');
const cors = require('cors');
const Yout = require('youch');
const Sentry = require('@sentry/node');
const sentryConfig = require('./config/sentry');
require('express-async-errors');
const routes = require('./routes');
require('./database');

class App{
    constructor(){
        this.server = express();

        Sentry.init(sentryConfig);

        this.middlewares();
        this.routes();
        this.exceptionHandler();
    }

    middlewares(){
        this.server.use(Sentry.Handlers.requestHandler());
        this.server.use(express.json());
    }

    routes(){
        this.server.use(cors());
        this.server.use(routes);
        this.server.use(Sentry.Handlers.errorHandler());
    }
    exceptionHandler(){
        this.server.use(async (err, req, res, next)=>{

            if(process.env.NODE_ENV == 'development'){
                const errors = await new Yout(err, req).toJSON();
                return res.status(500).json(errors);
            }
            return res.status(500).json({ error: 'Internal server error '});
        });

    }
}

module.exports = new App().server;