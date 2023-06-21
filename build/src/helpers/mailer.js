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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_smtp_transport_1 = __importDefault(require("nodemailer-smtp-transport"));
const transporterDetails = (0, nodemailer_smtp_transport_1.default)({
    host: "",
    port: 465,
    secure: true,
    auth: {
        user: "",
        pass: "",
    },
    tls: {
        rejectUnauthorized: false,
    },
});
const sendEmail = (email, fullname, subject, message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport(transporterDetails);
        yield transporter.sendMail({
            from: "",
            to: email,
            subject: subject,
            html: `<h1> Hello ${fullname} </h1>
               <p> ${message} </p>`,
        });
        return true;
    }
    catch (err) {
        return false;
    }
});
exports.sendEmail = sendEmail;
//# sourceMappingURL=mailer.js.map