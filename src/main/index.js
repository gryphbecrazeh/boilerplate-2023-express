const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('../../config/config');
const DBController = require('./controllers/DBController');

const Sequelize = require('sequelize');
const { Client } = require('pg');
console.log(process.env.DATABASE_URL)
const sequelize = new Sequelize(process.env.DATABASE_URL);
const User = require('../data/models/User')(sequelize, Sequelize.DataTypes);
sequelize.sync({ force: false }).then(() => {
    // Set the view engine to ejs
    app.set('view engine', 'ejs'); // set the view engine as ejs
    app.set('views', path.join(process.env.BASE_PATH, 'src/main/views')); // set the views directory
    app.use(express.static(path.join(process.env.BASE_PATH, 'dist')));
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    const _ = require('lodash')

    // Define a function to scan the directory and return a paginated result
    // Define a route to render the index.ejs file

    app.use(express.static(path.join(process.env.BASE_PATH, 'public')));

    app.get(process.env.CSS_PATH, (req, res) => { res.type('css'); res.sendFile(path.join(process.env.BASE_PATH, 'dist', 'output.css')); });
    app.get(process.env.JS_PATH, (req, res) => { res.type('js'); res.sendFile(path.join(process.env.BASE_PATH, 'public/js', 'bundle.js')); });

    // app.get('/scratch', async (req, res) => {
    //     const DB = new DbController();
    //     return await DB.query({ name: 'get-media', text: 'SELECT * FROM media', values: [], rowMode: 'array' }).then((result) => {
    //         console.log(result)
    //         return res.json(result.rows)
    //     }).catch((err) => {
    //         console.log(err)
    //         return res.status(500).json({ error: err })
    //     });
    // });
    app.get('/', (req, res) => {

        // let navigationController = new NavigationController()

        res.render('index', {
            title: 'Express Template',
            message: 'Hello from EJS',
            path: process.env.CSS_PATH,
            scriptPath: process.env.JS_PATH,
            pagination: [],
            // ...navigationController.index(req, res)
        });
    });


    // Start the server on port 3000
    app.listen(3000, () => {
        console.log('Server is running on port http://127.0.0.1:3000');
    });

    console.log("Drop and re-sync db.");
})

