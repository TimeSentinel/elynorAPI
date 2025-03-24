/* -------------------------------------------
(c)2025 Lance Stubblefield
elynors-api: routes/users/userController.js
-------------------------------------------- */

import bcrypt from "bcrypt";
import db from "./Models/index.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import validator from 'validator';

dotenv.config();

const User = db.users;

// ------------- Register User -------------
const register = async (req, res) => {
    try {
        const {name, email, password, permissions} = req.body;
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
            console.log(token);
            const userData = {
                userID: user.userID,
                userName: user.userName,
                userEmail: user.userEmail,
                userPermissions: user.userPermissions,
                userLastAccess: user.userLastAccess
            }
            return res.status(201).send(userData);
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
                        if (userData.userPermissions.includes("admin")) console.log("######## ADMIN LOGIN ########")
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

// need to work on update function... change password separate??
const update = async (req, res) => {
    try {
        const {id, name, email, permissions, active} = req.body;
        if (!validator.isEmail(email)) res.status(409).send("Invalid email address");
        const username = await User.findOne({where: {userName: name,}});
        if (username) return res.status(409).send("Username already taken");
        if (!validator.matches(name, '^[a-zA-Z_.-]*$'))
            return res.status(400).send("userName must contain only letters");
        const user = await User.findOne({where: {userID: id},});
        user.userName = name;
        user.userEmail = email;
        user.userPermissions = (permissions.toString().split(","));
        user.userActive = active;
        await user.save()
        return res.status(200).send(user.userName + " UPDATED");
    } catch (error) {
        console.log(error);
    }
}

const userupdate = async (req, res) => {
    try {
        const {id, password, password2, email} = req.body;
        if (!validator.equals(password, password2)) return res.status(400).send("Passwords do not match");
        if (!validator.isLength(password, {min: 8, max: 16}))
            return res.status(400).send("Password must be between 8 and 16 characters");
        if (!validator.isEmail(req.body.email)) res.status(409).send("Invalid email address");
        const user = await User.findOne({where: {userID: id},});
        user.userPassword = await bcrypt.hash(password, 10);
        user.userEmail = email;
        await user.save()
        return res.status(200).send(user.userName + " UPDATED");
    } catch (error) {
        console.log(error);
    }
}

export {
    register,
    login,
    update,
    userupdate,
}