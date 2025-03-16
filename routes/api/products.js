/* -------------------------------------------
(c)2025 Lance Stubblefield
elynors-api: routes/api/products.ts
-------------------------------------------- */

import express from 'express';
const products = express.Router();

products.get("/", async (req, res) => {
    res.send(":::PRODUCTS:::")
})

export default products;