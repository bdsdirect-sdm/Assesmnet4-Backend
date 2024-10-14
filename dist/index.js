"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
(0, dotenv_1.config)();
app.use((0, cors_1.default)({
    origin: "*"
}));
app.use(express_1.default.json());
app.use('/upload', express_1.default.static(path_1.default.join(__dirname, '../upload')));
app.use("/api/v1", routes_1.default);
app.get('/', (req, res) => {
    res.send(`<h1>Your app is running on port ${process.env.PORT}</h1>`);
});
exports.default = app;
