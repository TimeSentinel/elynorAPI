/* -------------------------------------------
(c)2025 Lance Stubblefield
elynors-api: routes/api/products.ts
-------------------------------------------- */

import express from 'express';

import productQueries from "../products/productqueries.js";

const products = express.Router();

// -------------------------------------------- GET --------------------------------------------

products.get('/', (req, res) => {
    switch (req.query.query) {
        case 'products':
            productQueries.listProducts()
                .then(response => {
                    res.status(200).send(response);
                    if (debug) console.log(response)
                })
                .catch(error => {
                    res.status(500).send(error);
                })
            break;
        case 'categories':
            productQueries.listCategories()
                .then(response => {
                    res.status(200).send(response);
                    if (debug) console.log(response)
                })
                .catch(error => {
                    res.status(500).send(error);
                })
            break;
        case 'subcats':
            productQueries.listSubcats()
                .then(response => {
                    res.status(200).send(response);
                    if (debug) console.log(response)
                })
                .catch(error => {
                    res.status(500).send(error);
                })
            break;
        case 'card':
            productQueries.getDetails(req.query.id)
                .then(response => {
                    res.status(200).send(response);
                    if (debug) console.log(response)
                })
                .catch(error => {
                    res.status(500).send(error);
                })
            break;
        case 'productprice':
            productQueries.getProdPrice(req.query.id)
                .then(response => {
                    res.status(200).send(response);
                    if (debug) console.log(response)
                })
                .catch(error => {
                    res.status(500).send(error);
                })
            break;
        case 'itemprice':
            productQueries.getItemPrice(req.query.id)
                .then(response => {
                    res.status(200).send(response);
                    if (debug) console.log(response)
                })
                .catch(error => {
                    res.status(500).send(error);
                })
            break;
        case 'cartProduct':
            productQueries.getCartProduct(req.query.id)
                .then(response => {
                    res.status(200).send(response);
                    if (debug) console.log(response)
                })
                .catch(error => {
                    res.status(500).send(error);
                })
            break;
        case 'cartItem':
            productQueries.getCartItem(req.query.id)
                .then(response => {
                    res.status(200).send(response);
                    if (debug) console.log(response)
                })
                .catch(error => {
                    res.status(500).send(error);
                })
            break;

        default:
            res.status(404).send("Sorry pal. Your page could not be found.");
            break;
    }

})

export default products;