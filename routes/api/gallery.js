/* -------------------------------------------
(c)2025 Lance Stubblefield
elynors-api: routes/api/gallery.ts
-------------------------------------------- */

import express from 'express';
const gallery = express.Router();

gallery.get("/", async (req, res) => {
    res.send("::::GALLERY::::")
})

export default gallery ;