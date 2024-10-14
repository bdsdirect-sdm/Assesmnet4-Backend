"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = exports.mailer = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.mailer = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.NODE_EMAIL,
        pass: process.env.EMAIL_KEY
    }
});
const sendMail = (to, subject, html) => {
    exports.mailer.sendMail({
        from: process.env.NODE_EMAIL,
        to: to,
        subject: subject,
        html: html
    });
};
exports.sendMail = sendMail;
