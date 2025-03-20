/* -------------------------------------------
(c)2025 Lance Stubblefield
elynors-api: routes/api/users.ts
-------------------------------------------- */

import express from 'express';
import {signup, login} from "../users/userController.js";
import saveUser from "../users/userAuth.js";

const users = express.Router();

// //create connection
// const sequelize = new Sequelize({
//     dialect: PostgresDialect,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     database: process.env.DB_NAME,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD
// });
//
// //test connection
// sequelize.authenticate().then(() => {
//     console.log("Database authenticated");
// }).catch((err) => {
//     console.log(err);
// })

// const db = {}
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

//connect to model
// db.users = models (sequelize, DataTypes)

users.get('/test', (req, res) => res.json({msg: 'Users Works'}))

// @route   POST users/register
// @access  admin
users.post('/register', saveUser, signup)
    // --> check email format (use Validator)
    // --> check for duplicate email (use sequelize.findone or whatever)
    // --> check password requirements (use validator.match)

// @route   POST users/register
// @access  public
users.post('/login', login )

// users.post('/edit', (req, res) => {
//
// })

// users.post('/delete', (req, res) => {
//
// })

export default users;