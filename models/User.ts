/* -------------------------------------------
(c)2025 Lance Stubblefield
elynors-api: models/User.js
-------------------------------------------- */

import {Sequelize, DataTypes} from '@sequelize/core';
import {PostgresDialect} from "@sequelize/postgres";

const sequelize = new Sequelize({dialect: PostgresDialect});

export const User = sequelize.define(
    "NewUser", {
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userEmail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userPassword: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userPermissions: {
            type: DataTypes.ARRAY(DataTypes.STRING),
        },
    }, {
        tableName: "accounts.users",
    })
