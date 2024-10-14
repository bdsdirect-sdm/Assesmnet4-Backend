"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSeekers = exports.getMyAgency = exports.updatePassword = exports.userLogin = exports.getAllAgencies = exports.userSignup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userDetail_1 = __importDefault(require("../models/userDetail"));
const hobbiesModel_1 = __importDefault(require("../models/hobbiesModel"));
const generateRandomCode_1 = require("../utilities/generateRandomCode");
const mailConnect_1 = require("../config/mailConnect");
const bcrypt_1 = __importDefault(require("bcrypt"));
const hassedPassword_1 = require("../utilities/hassedPassword");
const welcomeEmail_1 = require("../emailTemplates/welcomeEmail");
const userSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, phoneNo, gender, user_type, hobbies, isActive = true } = req.body;
        // console.log("hobbieshobbieshobbies",hobbies)
        console.log("deeapks chsekc", firstName, user_type);
        const hobbiArray = hobbies.split(",");
        console.log(firstName, lastName, email, "sdjfudfhuidfh");
        const password = (0, generateRandomCode_1.generateRandomCode)(8);
        console.log("passwordpassword", password);
        const hashedPassword = yield (0, hassedPassword_1.passwordToHassed)(password);
        const { profile_image } = req.files;
        let payload = { firstName, lastName, email, phoneNo, gender, user_type, password: hashedPassword, isActive, profile_image: profile_image === null || profile_image === void 0 ? void 0 : profile_image[0].path };
        if (user_type === "Job_Seeker") {
            const { agency } = req.body;
            payload.agency = agency;
            const { resume } = req === null || req === void 0 ? void 0 : req.files;
            const resumePath = resume === null || resume === void 0 ? void 0 : resume[0].path;
            payload.resume = resumePath;
        }
        const existUser = yield userDetail_1.default.findOne({ where: { email: email } });
        if (existUser) {
            res.status(409).json({
                message: "User Already exist",
                success: false
            });
            return;
        }
        const userDetail = yield userDetail_1.default.create(payload);
        const insertAllHobbies = hobbiArray === null || hobbiArray === void 0 ? void 0 : hobbiArray.map((hobbi) => hobbiesModel_1.default.create({
            hobbi,
            userId: userDetail === null || userDetail === void 0 ? void 0 : userDetail.id
        }));
        const hobbiDetail = yield Promise.all(insertAllHobbies);
        if (!userDetail || !hobbiDetail) {
            res.status(500).json({
                message: "Failed to create user",
                success: false
            });
        }
        yield (0, mailConnect_1.sendMail)(email, "Welcome Message", (0, welcomeEmail_1.welcomeEmail)(user_type, password, firstName + " " + lastName));
        res.status(200).json({
            success: true,
            message: "Successfully created user",
            userDetail,
            hobbiDetail
        });
    }
    catch (error) {
        res.status(500).json({
            message: "problem in creating user profile",
            success: false
        });
        console.log(error);
    }
});
exports.userSignup = userSignup;
const getAllAgencies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allAgencies = yield userDetail_1.default.findAll({
            where: {
                user_type: "Agency",
                isActive: true
            }
        });
        res.status(200).json({
            success: true,
            data: allAgencies
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
            message: "problem in getting all agencies",
            success: false
        });
    }
});
exports.getAllAgencies = getAllAgencies;
// export const userProfile = async(req:any, res:Response) =>{
//     try{
//         const  userId = req?.params?.id;
//         console.log('params', req?.params);
//         console.log('userId', userId);
//         const userFullDetails : any = await UserDetail.findOne({where:{id :userId},
//             include:[{model:AddressDetail, as : "user_address"}]
//         })
//         // const userFullDetails = await UserDetail.findByPk(userId);
//         // console.log(userFullDetails,"userDetailsbeforev:::::::")
//         // Object.keys(userFullDetails.user_address).forEach((key) =>{
//         //     userFullDetails[key] =  userFullDetails.user_address[key];
//         // }
//         if(!userFullDetails){
//             res.status(404).json({
//                 message:"User not found",
//                 success:false
//             })
//             return;
//         }
//         res.status(200).json({
//             message:"User Data",
//             success:true,
//             userFullDetails
//         })
//     }
//     catch(error){
//         res.status(500).json({
//             success:false,
//             message:"Unable to fetch details"
//         })
//     }   
// }
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log(email, password, "loginninni");
        if (!email || !password) {
            res.status(404).json({
                message: "Details is incomplete",
                success: false
            });
            return;
        }
        const user = yield userDetail_1.default.findOne({ where: {
                email: email,
            } });
        console.log("after check data fetch");
        if (!user) {
            res.status(404).json({
                message: "User is not exsist please Register",
                success: false
            });
            return;
        }
        if (!(yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password))) {
            res.status(409).json({
                success: false,
                message: "password is incorrect"
            });
            return;
        }
        const payload = {
            user
        };
        const token = yield jsonwebtoken_1.default.sign(payload, process.env.SECREAT_KEY, {
            expiresIn: "1h"
        });
        user.password = undefined;
        res.status(200).json({
            message: "token generate succesfully",
            token,
            user,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error
        });
        console.log(error);
    }
});
exports.userLogin = userLogin;
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.user;
        const { password } = req.body;
        const hashedPassword = yield (0, hassedPassword_1.passwordToHassed)(password);
        console.log("hashedPasswordhashedPassword", hashedPassword);
        const result = yield userDetail_1.default.findOne({
            where: { email: email }
        });
        result.password = hashedPassword;
        result.isActive = true;
        yield (result === null || result === void 0 ? void 0 : result.save());
        console.log("updated data", result);
        res.status(200).json({
            success: true,
            message: "password updated succesfully"
        });
    }
    catch (error) {
        res.status(500).json({
            message: error,
            success: false,
        });
        console.log(error);
    }
});
exports.updatePassword = updatePassword;
const getMyAgency = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const agencyName = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.agency;
        const agency = yield userDetail_1.default.findOne({
            where: {
                firstName: agencyName
            }
        });
        res.status(200).json({
            success: true,
            agency: agency
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error
        });
    }
});
exports.getMyAgency = getMyAgency;
const getAllSeekers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const agencyName = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.firstName;
        const sekeers = yield userDetail_1.default.findAll({
            where: {
                agency: agencyName
            }
        });
        res.status(200).json({
            success: true,
            sekeers: sekeers
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error
        });
    }
});
exports.getAllSeekers = getAllSeekers;
// export const updateProfile  = async(req:any, res:Response) => {
//     try{
//         const id = req.params?.id;
//         const {firstName, lastName,email
//             ,companyAddress, companyCity
//             , companyState , companyZip, homeAddress, homeCity, homeState, homeZip
//         } = req.body;
//         const {profile_image, appointment_letter} = req?.files;
//         if(!firstName || !lastName || !email 
//             || !companyAddress || !companyCity 
//             || !companyState || !companyZip || !homeAddress|| !homeCity || !homeState || !homeZip
//         ){
//             res.status(400).json({
//                 message:"Please fill all the fields",
//                 success:false
//             })
//             return;
//         } 
//         const updated_user  = await UserDetail.update({
//             firstName, lastName,email,
//             profile_image:profile_image[0].path , appoinment_letter:appointment_letter[0].path   
//         },{
//             where:{
//                 id :  id
//             }
//         })
//         const updated_address = await AddressDetail.update({
//             companyAddress, companyCity, 
//             companyState , companyZip, homeAddress, homeCity, homeState, homeZip
//         },{
//             where:{
//                 userId :  id
//             }
//         })
//         if(!updated_user ||  !updated_address){
//             res.status(400).json({
//                 message:"unable to update data",
//                 success:false           
//             })
//             return;
//         }
//         // await fetchUser.save();
//         // res.status(200).json({
//         //     success:true,
//         //     message:"Update value successfull"
//         // })
//         // return;
//         res.status(200).json({
//             success:true,
//             message:"Successfully Updated"
//         })
//     } catch(error){
//         res.status(500).json({
//             success:false,
//             message:"Unable to update details"
//         })      
//     }
// }
