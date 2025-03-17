/* ---------------------------------------
backend/ProductTest.tsx
PROJECT: productsAPI;

(c) 2025 Lance Stubblefield
--------------------------------------- */

// ------------------- DEBUG ------------------
const debug = false

import pkg from 'pg';
const {Pool} = pkg;

import {config} from "dotenv";

// import crypto from "crypto";

config();

if (debug) console.log("connected: ", process.env.DB_NAME)

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5372,
});

// function generateUUID() {
//     const newUUID = crypto.randomUUID();
//     if (debug) console.log("UUID: " + newUUID);
//     return newUUID;
// }

const querySelect = {
    select: {
        listThemes: "SELECT themeID, themeName, themeLabelBGcolor, themeLabelTXTcolor FROM themes.templates",
        getTheme: "SELECT * FROM themes.templates where themeID = $1"
    },
    insert: {
        addTheme: "INSERT INTO themes.templates (*) " +
            "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'n', now())",
    },
    update: {
        editTheme: "UPDATE themes.templates SET * = $2 WHERE ID = $1"
    },
    delete: {
       deleteTheme: "DELETE FROM themes.templates WHERE ID = $1"
    }
}

// ---------------------------------------------------- LISTS ----------------------------------------------------
const listThemes = async () => {
    try {
        return await new Promise(function (resolve, reject) {
            pool.query(querySelect.select.listThemes, (error, results) => {
                if (error) {
                    reject(error);
                }
                if (results && results.rows) {
                    resolve(results.rows);
                } else {
                    reject(new Error("No results found"));
                }
            });
        });
    } catch (error_1) {
        console.error(error_1);
        throw new Error("Internal server error");
    }
};

const getThemeByID = async (id) => {
    try {
        return await new Promise(function (resolve, reject) {
            if (debug) console.log("themeByID: ", querySelect.select.getTheme)
            pool.query(querySelect.select.getTheme, [id], (error, results) => {
                if (error) {
                    reject(error);
                }
                if (results && results.rows) {
                    resolve(results.rows);
                } else {
                    reject(new Error("No results found"));
                }
            });
        });
    } catch (error_1) {
        console.error(error_1);
        throw new Error("Internal server error");
    }
};


// #############################################################################################

export default{
    listThemes,
    getThemeByID
};