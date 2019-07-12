"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class Database {
    constructor() {
        // private  DB_URL = 'mongodb://link-db/db_portal'; Docker compose
        this.DB_URL = 'mongodb://localhost:27017/db_portal';
    }
    createConnection() {
        mongoose.connect(this.DB_URL);
    }
}
exports.default = Database;
