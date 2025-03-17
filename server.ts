/* -------------------------------------------
(c)2025 Lance Stubblefield
elynors-api: /server.ts
-------------------------------------------- */

import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import cookieParser from "cookie-parser";

import users from "./routes/api/users.js"
import products from "./routes/api/products.js"
import themes from "./routes/api/themes.js"
import news from "./routes/api/news.js"
import gallery from "./routes/api/gallery.js"

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
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

app.use("/users", users);
app.use("/products", products);
app.use("/themes", themes);
app.use("/news", news);
app.use("/gallery", gallery);


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})


