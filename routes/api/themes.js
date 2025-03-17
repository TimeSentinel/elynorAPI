/* -------------------------------------------
(c)2025 Lance Stubblefield
elynors-api: routes/api/themes.ts
-------------------------------------------- */

// ------------------- DEBUG ------------------
const debug = true

import express from 'express';

import themeQueries from "../themes/themequeries.js";

const themes = express.Router();

// --------------------------------------------------------------------------------------

// --------------- select ---------------
themes.get('/', (req, res) => {
    switch (req.query.query) {
        case 'themes':
            themeQueries.listThemes()
                .then(response => {
                    res.status(200).send(response);
                    if (debug) console.log(response)
                })
                .catch(error => {
                    res.status(500).send(error);
                })
            break;
        case 'theme/:id':
            themeQueries.getThemeByID(req.params.id)
                .then(response => {
                    res.status(200).send(response);
                    if (debug) console.log(response)
                })
                .catch(error => {
                    res.status(500).send(error);
                })
        default:
            res.status(404).send("Sorry pal. Your page could not be found.");
            break;
    }}
)



// --------------- update ---------------


// --------------- insert ---------------


// --------------- delete ---------------


// #############################################################################################


    export default themes;