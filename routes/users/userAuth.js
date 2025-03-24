/* -------------------------------------------
(c)2025 Lance Stubblefield
elynors-api: routes/users/userAuth.js
-------------------------------------------- */

import db from "./Models/index.js";
import validator from 'validator';

const User = db.users;

const saveUser = async (req, res, next) => {
    try {
        // ########## ----- username ----- ##########
        const username = await User.findOne({where: {userName: req.body.name,}});
        if (username) return res.status(409).send("Username already taken");
        if(!validator.isLength(req.body.name, {min: 4, max: 24}))
            return res.status(400).send("userName must be between 4 and 24 characters");
        if (!validator.matches(req.body.name, '^[a-zA-Z_.-]*$'))
            return res.status(400).send("userName must contain only letters");

        // ########## ----- email ----- ##########
        const emailcheck = await User.findOne({where: {userEmail: req.body.email,}});
        if (emailcheck) return res.status(409).send("Email already registered");
        if (!validator.isEmail(req.body.email)) return res.status(409).send("Invalid email address");

        // ########## ----- password ----- ##########
        if (!validator.equals(req.body.password, req.body.password2)) return res.status(401).send("Passwords do not match");
        if (!validator.isLength(req.body.password, {min: 8, max: 16}))
            return res.status(400).send("Password must be between 8 and 16 characters");

        next();
    } catch (error) {
        console.log(error);
    }
};

export default saveUser;
