/* -------------------------------------------
(c)2025 Lance Stubblefield
elynors-api: routes/api/users.ts
-------------------------------------------- */

import express from 'express';
import {UserSchema as user} from "../../models/User.ts";
import bcrypt from "bcryptjs";
import { Sequelize} from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";

const users = express.Router();
const sequelize = new Sequelize({
    dialect: PostgresDialect,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

users.get('/test', (req, res) => res.json({msg: 'Users Works'}))

// @route   POST users/register
// @access  admin
users.post('/register', (req, res) => {
    // --> check email format (use Validator)
    // --> check for duplicate email (use sequelize.findone or whatever)
    // --> check password requirements (use validator.match)
    // ----- newUser -----
    const newUser = new user({
        name: req.body.name,
        email: req.body.email,
        permissions: req.body.permissions,
    })
    // ----- hash password -----
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
        })
    })
    // --> write record

})

// @route   POST users/register
// @access  public
users.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // --> match email
    // --> compare password


})


users.post('/edit', (req, res) => {

})

users.post('/delete', (req, res) => {

})
export default users;