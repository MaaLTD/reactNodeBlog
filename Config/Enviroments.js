import dotenv from "dotenv";
dotenv.config();

const Config = {
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PSWD,
    dbHost: process.env.DB_HOST,
    dbDriver: process.env.DB_DRIVER,

    appPort: process.env.APP_PORT,
    appSecretKey: process.env.APP_SECRET_KEY,
};

export default Config;