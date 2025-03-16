/* -------------------------------------------
(c)2025 Lance Stubblefield
elynors-api: /server.ts
-------------------------------------------- */

import dotenv from "dotenv";
dotenv.config();

import express from "express";
const app = express();

import users from "./routes/api/users.js"
import products from "./routes/api/products.js"
import themes from "./routes/api/themes.js"
import news from "./routes/api/news.js"
import gallery from "./routes/api/gallery.js"

// @ts-expect-error - temporary override during development
app.get('/', (req, res) =>
    res.send("Welcome to Elynor's Server!") )

app.use("/users", users);
app.use("/products", products);
app.use("/themes", themes);
app.use("/news", news);
app.use("/gallery", gallery);


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})


