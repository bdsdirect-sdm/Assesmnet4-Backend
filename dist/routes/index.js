"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_1 = __importDefault(require("../routes/userRoutes"));
const allRoutes = (0, express_1.Router)();
const defaultRoutes = [
    {
        path: "/",
        route: userRoutes_1.default
    }
];
defaultRoutes.forEach((route) => {
    allRoutes.use(route.path, route.route);
});
exports.default = allRoutes;
