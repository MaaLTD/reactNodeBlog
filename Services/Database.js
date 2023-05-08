import dotenv from 'dotenv';
import { Sequelize } from "sequelize";

dotenv.config();
const params = process.env;

export const sequelize = new Sequelize(params.DB_NAME, params.DB_USER, params.DB_PSWD, {
    host: params.DB_HOST,
    dialect: params.DB_DRIVER, /* 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
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
        .then((value) => {
            console.log('Соединение с БД успешно закрыто');
        })
        .catch((err) => {
            console.log(err);
        });
};

