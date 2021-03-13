import { DataTypes } from 'sequelize';
import { db } from '../db/connection';

const User = db.define('User', {
    division_id: {
        type: DataTypes.INTEGER
    },
    full_name: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.INTEGER
    },
    age: {
        type: DataTypes.INTEGER
    },
    email: {
        type: DataTypes.STRING
    },
    position: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.BOOLEAN
    }
});

export default User;