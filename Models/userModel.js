/* -------------------------------------------
(c)2025 Lance Stubblefield
elynors-api: Models/userModel.js
-------------------------------------------- */


export default (sequelize, DataTypes) => {
    return sequelize.define(
        "user", {
            userID: {
                type: DataTypes.UUID,
                primaryKey: true,
                unique: true,
                allowNull: false,
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            userEmail: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            userPassword: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            userPermissions: {
                type: DataTypes.ARRAY(DataTypes.STRING),
            },
            userActive: {
                type: DataTypes.FLOAT,
            }
        }, {
            schema: "accounts",
            tableName: "users",
            timestamps: false,
            createdAt: false,
            updatedAt: false,
        });
}