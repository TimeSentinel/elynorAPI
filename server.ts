/* -------------------------------------------
(c)2025 Lance Stubblefield
elynors-api: /server.ts
-------------------------------------------- */

import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import users from "./routes/api/users.js"
import products from "./routes/api/products.js"
import themes from "./routes/api/themes.js"
import news from "./routes/api/news.js"
import gallery from "./routes/api/gallery.js"

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use(function (req, res, next) {
    const allowedOrigins = [process.env.ORIGINS];
    const origin = req.headers.origin || "";
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.get('/', (req, res) => {
                    res.status(200).send("Welcome to Elynor's Website");
    })

if (process.env.USERS) app.use("/users", users);
if (process.env.PRODUCTS) app.use("/products", products);
if (process.env.THEMES) app.use("/themes", themes);
if (process.env.NEWS) app.use("/news", news);
if (process.env.GALLERY) app.use("/gallery", gallery);
// if (process.env.ACCOUNTS) app.use("/accounts", accounts);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})


