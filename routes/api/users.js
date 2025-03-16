/* -------------------------------------------
(c)2025 Lance Stubblefield
elynors-api: routes/api/users.ts
-------------------------------------------- */

import express from 'express';
const users = express.Router();

users.get("/", async (req, res) => {
    res.send(":::USERS:::")
})

export default users;