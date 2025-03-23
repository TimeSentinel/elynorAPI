/* -------------------------------------------
(c)2025 Lance Stubblefield
elynors-api: routes/users/userAuth.js
-------------------------------------------- */

import db from "./Models/index.js";
const User = db.users;

const saveUser = async (req, res, next) => {
    try {
        const username = await User.findOne({ //search the database to see if user exist
            where: {
                userName: req.body.name,
            },
        });
        if (username) {
            return res.json(409).send("Username already taken");
        } else {
            const emailcheck = await User.findOne({  //checking if email already exist
                where: {
                    userEmail: req.body.email,
                },
            });
            if (emailcheck) {
                return res.json(409).send("Email already registered");
            }
        }
        next();
    } catch (error) {
        console.log(error);
    }
};

export default saveUser;
