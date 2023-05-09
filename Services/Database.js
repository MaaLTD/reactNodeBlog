import Config from "../Config/Enviroments.js";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(Config.dbName, Config.dbUser, Config.dbPassword, {
    host: Config.dbHost,
    dialect: Config.dbDriver, /* 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    dialectOptions: {
        connectTimeout: 1000
    }
});

export const Open = async () => {
    try {
        await sequelize.authenticate()
        console.log('Соединение с БД было успешно установлено')
    } catch (e) {
        console.log('Невозможно выполнить подключение к БД: ', e)
    }
}

export const Close = () => {
    sequelize.close()
        .then(() => {
            console.log('Соединение с БД успешно закрыто');
        })
        .catch((err) => {
            console.log(err);
        });
};

