/* -------------------------------------------
(c)2025 Lance Stubblefield
elynors-api: routes/users/userController.js
-------------------------------------------- */

import bcrypt from "bcrypt";
import db from "../../Models/index.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const User = db.users;

// New User
const signup = async (req, res) => {
    try {
        const { userName, email, password, permissions } = req.body;

        const data = {
            userID: crypto.randomUUID(),
            userName: userName,
            userEmail: email,
            userPassword: await bcrypt.hash(password, 10),
            userPermissions: permissions,
        };

        const user = await User.create(data);

        if (user) {
            let token = jwt.sign({ id: user.userID }, process.env.secretKey, {
                expiresIn: process.env.EXPIRES
            });
            res.cookie("jwt", token, { maxAge: process.env.EXPIRES, httpOnly: true });
            console.log("user", JSON.stringify(user, null, 2));
            console.log(token);
            //send users details
            return res.status(201).send(user);
        } else {
            return res.status(409).send("Details are not correct");
        }
    } catch (error) {
        console.log(error);
    }
};


//Authentication
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            where: {
                userEmail: email
            }
        });
        console.log(user);
        if (user) {
            const isSame = await bcrypt.compare(password, user.userPassword);

            if (isSame) {
                let token = jwt.sign({ id: user.userID }, process.env.SECRETKEY, {
                    expiresIn: process.env.EXPIRES,
                });
                res.cookie("jwt", token, { maxAge: process.env.EXPIRES, httpOnly: true });
                console.log("user", JSON.stringify(user, null, 2));
                console.log(token);
                //send user data
                return res.status(201).send(user);
            } else {
                return res.status(401).send("Authentication failed");
            }
        } else {
            return res.status(401).send("Authentication failed");
        }
    } catch (error) {
        console.log(error);
    }
};

export {
    signup,
    login,
}