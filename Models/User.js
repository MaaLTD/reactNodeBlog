import {sequelize, Open} from "../Services/Database.js";
import {DataTypes} from "sequelize";

await Open();

export const User = sequelize.define('User', {
    _id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
    },
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    avatarUrl: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

User.sync({force: false}).then(() => {
    console.log('Users table created successfully!');
}).catch((error) => {
    console.error('Unable to create table : ', error);
});

