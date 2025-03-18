/* -------------------------------------------
(c)2025 Lance Stubblefield
elynors-api: Models/index.js
-------------------------------------------- */

//importing modules
import {DataTypes, Sequelize} from "sequelize";
import userModel from "./userModel.js";
import {PostgresDialect} from "@sequelize/postgres";


const sequelize = new Sequelize({
    dialect: PostgresDialect,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

//checking if connection is done
sequelize.authenticate().then(() => {
    console.log(`Database connected to discover`)
}).catch((err) => {
    console.log(err)
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

//connecting to model
db.users = userModel (sequelize, DataTypes)

//exporting the module
module.exports = db