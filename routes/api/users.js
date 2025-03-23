/* -------------------------------------------
(c)2025 Lance Stubblefield
elynors-api: routes/api/users.ts
-------------------------------------------- */

import express from 'express';
import {register, login} from "../users/userController.js";
import saveUser from "../users/userAuth.js";

const users = express.Router();

users.get('/test', (req, res) => res.json({msg: 'Users Works'}))

// @route   POST users/register
// @access  admin
users.post('/register', saveUser, register)
    // --> check email format (use Validator)
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