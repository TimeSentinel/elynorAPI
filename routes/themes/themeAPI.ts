/* ---------------------------------------
backend/dbSetup/productAPItest.ts
PROJECT: productsAPI;

(c) 2025 Lance Stubblefield 
--------------------------------------- */

const express = require("express");
const app = express()
const port = 3002
const themeQueries = require("./ThemeQueries.tsx")

// ------------------- DEBUG ------------------
const debug = false

app.use(express.json())
app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});


// --------------------------------------------------------------------------------------

// --------------- select ---------------
app.get('/themes', (req, res) => {
    themeQueries.listThemes()
        .then(response => {
            res.status(200).send(response);
            if (debug) console.log(response)
        })
        .catch(error => {
            res.status(500).send(error);
        })
})
// --------------- by id ---------------
app.get('/theme/:id', (req, res) => {
    themeQueries.getThemeByID(req.params.id)
        .then(response => {
            res.status(200).send(response);
            if (debug) console.log(response)
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

// --------------- update ---------------


// --------------- insert ---------------


// --------------- delete ---------------


// #############################################################################################


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})