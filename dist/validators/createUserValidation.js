"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostValidator = void 0;
const express_validator_1 = require("express-validator");
const feildValidator_1 = require("../middlewares/feildValidator");
exports.createPostValidator = [
    (0, express_validator_1.check)("firstName")
        .not()
        .isEmpty()
        .withMessage("First Name is required"),
    (0, express_validator_1.check)("email")
        .not()
        .isEmpty()
        .withMessage("Email is empty")
        .isEmail()
        .withMessage("Email is required"),
    (0, express_validator_1.check)("phoneNo")
        .not()
        .isEmpty()
        .withMessage("Contact  Number is required"),
    (0, express_validator_1.check)("gender")
        .isIn(["male", "female", "other"])
        .withMessage("gender should be male , female or other"),
    (0, express_validator_1.check)("user_type")
        .not()
        .isEmpty()
        .withMessage("User Type is required")
        .isIn(["Agency", "Job_Seeker"])
        .withMessage("Role should be selected"),
    (0, express_validator_1.check)("agency")
        .optional()
        .isString()
        .withMessage("agenct should be string"),
    (req, res, next) => {
        (0, feildValidator_1.validateUser)(req, res, next);
    }
];
