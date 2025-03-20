/* -------------------------------------------
(c)2025 Lance Stubblefield
elynors-api: Models/index.js
-------------------------------------------- */

//importing modules
import {DataTypes, Sequelize} from "sequelize";
import userModel from "./userModel.js";
import dotenv from "dotenv";
dotenv.config();


const sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

//checking if connection is done
sequelize.authenticate().then(() => {
    console.log(`victorius is plugged in`)
}).catch((err) => {
    console.log("THERE IS NO LANCE", err)
    console.log("user: ", process.env.DB_USER);
    console.log(sequelize);
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

//connecting to model
db.users = userModel (sequelize, DataTypes)

//exporting the module
export default db;