"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const node_fs_1 = __importDefault(require("node:fs"));
const uuid_1 = require("uuid");
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const dir = "upload";
        if (!node_fs_1.default.existsSync(dir)) {
            node_fs_1.default.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const file_Name = (0, uuid_1.v4)() + "." + file.originalname;
        cb(null, file_Name);
    }
});
const imagaeuploader = (0, multer_1.default)({
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log(req.file, "body");
        if (file.fieldname == "profile_image") {
            if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
                cb(null, true);
            }
            else {
                cb(new Error("Only png and jpeg files are allowed"));
            }
        }
        else if (file.fieldname == "resume") {
            if (file.mimetype === "application/pdf" || file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                cb(null, true);
            }
            else {
                cb(new Error("only pdf and docs files are allowed"));
            }
        }
        else {
            cb(null, true);
        }
    }
});
exports.default = imagaeuploader;
