"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbconnect_1 = __importDefault(require("../config/dbconnect"));
const hobbiesModel_1 = __importDefault(require("./hobbiesModel"));
class UserDetail extends sequelize_1.Model {
}
UserDetail.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    phoneNo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: sequelize_1.DataTypes.ENUM,
        values: ["male", "female", "other"],
        allowNull: false
    },
    user_type: {
        type: sequelize_1.DataTypes.ENUM,
        values: ["Agency", "Job_Seeker"],
        allowNull: false
    },
    agency: {
        type: sequelize_1.DataTypes.STRING,
    },
    resume: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    profile_image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize: dbconnect_1.default,
    tableName: "userdetails"
});
UserDetail.hasMany(hobbiesModel_1.default, {
    sourceKey: "id",
    foreignKey: "userId",
    as: "address"
});
hobbiesModel_1.default.belongsTo(UserDetail, {
    targetKey: "id",
    foreignKey: "userId",
    as: "user"
});
exports.default = UserDetail;
