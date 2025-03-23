/* -------------------------------------------
(c)2025 Lance Stubblefield
elynors-api: routes/api/users.ts
-------------------------------------------- */

import express from 'express';
import {register, login, update, userupdate} from "../users/userController.js";
import saveUser from "../users/userAuth.js";

const users = express.Router();

users.get('/test', (req, res) => res.json({msg: 'Users Works'}))

// @route   POST users/register
// @access  public
// @required: email, password
users.post('/login', login )

// @route   POST users/register
// @access  admin
// @required: id, name, email, permissions, password, password2
users.post('/register', saveUser, register)

// @route   POST users/update
// @access  admin
// @required: id, name, email, permissions, active
users.post('/edit', update)

// @route   POST users/userupdate
// @access  user
// @required: id, email, password, password2
users.post('/userupdate', userupdate)

export default users;