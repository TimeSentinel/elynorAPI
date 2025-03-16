/* -------------------------------------------
(c)2025 Lance Stubblefield
elynors-api: routes/api/news.ts
-------------------------------------------- */

import express from 'express';
const news = express.Router();

news.get("/", async (req, res) => {
    res.send("::::NEWS::::")
})

export default news;