"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbconnect = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql"
});
const dbconnect = () => {
    sequelize.sync({ alter: true }).then(() => {
        console.log("database connected and syncronized successfully");
    }).catch((err) => {
        console.log(err);
        console.log("Problem in creating user");
    });
};
exports.dbconnect = dbconnect;
exports.default = sequelize;
