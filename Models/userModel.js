/* -------------------------------------------
(c)2025 Lance Stubblefield
elynors-api: Models/userModel.js
-------------------------------------------- */


export default (sequelize, DataTypes) => {
    return sequelize.define(
        "NewUser", {
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
        }, {
            tableName: "accounts.users",
        });
}