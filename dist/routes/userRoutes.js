"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createUserValidation_1 = require("../validators/createUserValidation");
const userController_1 = require("../controllers/userController");
const multer_middlerware_1 = __importDefault(require("../middlewares/multer.middlerware"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const userRoute = (0, express_1.Router)();
userRoute.post('/signup', multer_middlerware_1.default.fields([{ name: "profile_image", maxCount: 1 }, { name: "resume", maxCount: 1 }]), createUserValidation_1.createPostValidator, userController_1.userSignup);
userRoute.post("/login", userController_1.userLogin);
userRoute.get("/getAllAgency", userController_1.getAllAgencies);
userRoute.put("/updatePassword", authMiddleware_1.auth, userController_1.updatePassword);
userRoute.get("/getMyAgency", authMiddleware_1.auth, userController_1.getMyAgency);
userRoute.get("/getAllSeekers", authMiddleware_1.auth, userController_1.getAllSeekers);
exports.default = userRoute;
