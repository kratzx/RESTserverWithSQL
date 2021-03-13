import { Sequelize } from 'sequelize';
import config from '../../config'

const { dbName, 
        dbUser, 
        dbPass 
} = config.mySQL;

export const db = new Sequelize(dbName, dbUser, dbPass, {
        host: 'localhost',
        dialect: 'mysql',
        // logging: false,
});

export const dbConnect = async () => {
        try {
                await db.authenticate();
                console.log('Connection has been established successfully.');
        } catch (error) {
                console.error('Unable to connect to the database:', error);
        }
}

export const dbClose = async () => {
        db.close();
}

