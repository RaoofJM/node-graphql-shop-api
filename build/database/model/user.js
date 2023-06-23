"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.Level = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.DOCUMENT_NAME = "User";
exports.COLLECTION_NAME = "users";
var Level;
(function (Level) {
    Level["MEMBER"] = "member";
    Level["ADMIN"] = "admin";
    Level["MODERATOR"] = "superadmin";
})(Level || (exports.Level = Level = {}));
const schema = new mongoose_1.Schema({
    fullname: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        trim: true,
    },
    phone: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        unique: true,
    },
    email: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        unique: true,
    },
    password: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        minlength: 4,
    },
    isEmailVerified: {
        type: mongoose_1.Schema.Types.Boolean,
        default: false,
    },
    levels: {
        type: [
            {
                type: mongoose_1.Schema.Types.String,
                enum: Object.values(Level),
            },
        ],
        default: [Level.MEMBER],
    },
    createdAt: {
        type: mongoose_1.Schema.Types.Date,
        default: Date.now,
    },
    updatedAt: {
        type: mongoose_1.Schema.Types.Date,
        default: null,
    },
});
// Hashing Password Before Saving the User
schema.pre("save", function (next) {
    let user = this;
    if (!user.isModified("password")) {
        return next();
    }
    bcrypt_1.default.hash(user.password, 10, (err, hash) => {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});
exports.UserModel = (0, mongoose_1.model)(exports.DOCUMENT_NAME, schema, exports.COLLECTION_NAME);
//# sourceMappingURL=user.js.map