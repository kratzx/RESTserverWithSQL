import * as dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️ Couldn't find .env file");
}

let config = {
    // Load here default configs
    mySQL: {
        dbName: process.env.MYSQL_NAME,
        dbUser: process.env.MYSQL_USER, 
        dbPass: process.env.MYSQL_PASS
    },
    
    port: process.env.PORT
};

if (process.env.NODE_ENV === 'test') {
    // Load here configs that change for testing
    config.mySQL = {
        dbName: process.env.MYSQL_NAME_TEST,
        dbUser: process.env.MYSQL_USER_TEST, 
        dbPass: process.env.MYSQL_PASS_TEST
    }        
};

export default config;