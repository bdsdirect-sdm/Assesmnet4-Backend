"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbconnect_1 = require("./config/dbconnect");
const index_1 = __importDefault(require("./index"));
(0, dbconnect_1.dbconnect)();
index_1.default.listen(4400, () => {
    console.log("Server is running on port 4400");
});
exports.default = index_1.default;
