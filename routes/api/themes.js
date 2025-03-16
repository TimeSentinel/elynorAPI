/* -------------------------------------------
(c)2025 Lance Stubblefield
elynors-api: routes/api/themes.ts
-------------------------------------------- */

import express from 'express';
const themes = express.Router();

themes.get("/", async (req, res) => {
    res.send(":::THEMES:::")
})

export default themes;