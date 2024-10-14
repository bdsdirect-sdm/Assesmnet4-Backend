"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbconnect_1 = __importDefault(require("../config/dbconnect"));
class Hobbies extends sequelize_1.Model {
}
Hobbies.init({
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    hobbi: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: dbconnect_1.default,
    tableName: "hobbies"
});
exports.default = Hobbies;
