/* -------------------------------------------
(c)2025 Lance Stubblefield
elynors-api: routes/users/userAuth.js
-------------------------------------------- */

import db from "../../Models/index.js";
const User = db.users;

const saveUser = async (req, res, next) => {
    //search the database to see if user exist
    try {
        const username = await User.findOne({
            where: {
                userName: req.body.userName,
            },
        });
        //if username exist in the database respond with a status of 409
        if (username) {
            return res.json(409).send("Username already taken");
        }

        //checking if email already exist
        const emailcheck = await User.findOne({
            where: {
                userEmail: req.body.email,
            },
        });

        //if email exist in the database respond with a status of 409
        if (emailcheck) {
            return res.json(409).send("Email already registered");
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

export default saveUser;
