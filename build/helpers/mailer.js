"use strict";
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
const sendEmail = async (email, fullname, subject, message) => {
    try {
        const transporter = nodemailer_1.default.createTransport(transporterDetails);
        await transporter.sendMail({
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
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=mailer.js.map