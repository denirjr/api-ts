import * as mongoose from 'mongoose';

class Database {
    //Docker compose
    // private  DB_URL = 'mongodb://link-db/db_portal'; 

    //Localhost
    private DB_URL = 'mongodb://localhost:27017/db_portal';

    createConnection() {
        mongoose.connect(this.DB_URL);
    }
}

export default Database;