/* -------------------------------------------
(c)2025 Lance Stubblefield
elynors-api: routes/users/userController.js
-------------------------------------------- */

import bcrypt from "bcrypt";
import db from "./Models/index.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const User = db.users;

// ------------- Register User -------------
const register = async (req, res) => {
    try {
        const {name, email, password, permissions} = req.body;
        console.log(permissions);
        const data = {
            userID: crypto.randomUUID(),
            userName: name,
            userEmail: email,
            userPassword: await bcrypt.hash(password, 10),
            userPermissions: (permissions.toString().split(",")),
            userActive: 1,
            userLastAccess: Date.now(),
        };
        const user = await User.create(data);

        if (user) {
            let token = jwt.sign({id: user.userID}, process.env.SECRETKEY, {
                expiresIn: process.env.EXPIRES
            });
            res.cookie("jwt", token, {maxAge: process.env.EXPIRES, httpOnly: true});
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

// ------------- Authentication -------------
const login = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).send("Please enter email AND password");
    } else {
        try {
            const user = await User.findOne({
                where: {
                    userEmail: email
                }
            });
            if (user) {
                const isSame = await bcrypt.compare(password, user.userPassword);
                if (isSame) {
                    let token = jwt.sign({id: user.userID}, process.env.SECRETKEY, {
                        expiresIn: process.env.EXPIRES,
                    });
                    res.cookie("jwt", token, {maxAge: process.env.EXPIRES, httpOnly: true});
                    console.log(`User ${user.userName} logged in at ${Date.now().toString()}`);
                    console.log(token);
                    if (user.userActive === "1") {
                        const userData = {
                            userID: user.userID,
                            userName: user.userName,
                            userEmail: user.userEmail,
                            userPermissions: user.userPermissions,
                            userLastAccess: user.userLastAccess
                        }
                        user.userLastAccess = Date.now();
                        await user.save();
                        return res.status(201).send(userData);
                    } else {
                        return res.status(409).send("Inactive user");
                    }
                } else {
                    return res.status(401).send("Authentication failed");
                }
            } else {
                return res.status(401).send("No Account Found");
            }
        } catch (error) {
            console.log(error);
        }
    }
};

export {
    register,
    login,
}