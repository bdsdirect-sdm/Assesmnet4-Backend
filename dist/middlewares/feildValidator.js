"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const express_validator_1 = require("express-validator");
const validateUser = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    const err = errors.array();
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: err });
    }
    next();
};
exports.validateUser = validateUser;
