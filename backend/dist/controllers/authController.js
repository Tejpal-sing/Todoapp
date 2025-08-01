"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const authService = __importStar(require("../services/authService"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingUser = yield authService.checkExistingUser(req);
        if (existingUser !== null) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const newUser = yield authService.createNewUser(req);
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ error: "Registration failed" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailMatch = yield authService.checkExistingUser(req);
        if (!emailMatch) {
            return res.status(401).json({ error: "Invalid email id" });
        }
        const matchPassword = (yield authService.loginService(req)).matchPassword;
        if (!matchPassword) {
            return res.status(401).json({ error: "Invalid password" });
        }
        const accessToken = (yield authService.loginService(req)).accessToken;
        res.json({ accessToken });
    }
    catch (error) {
        res.status(500).json({ error: "Login Failed" });
    }
});
exports.login = login;
const logout = (req, res) => {
    res
        .clearCookie("accessToken", {
        secure: true,
        sameSite: "none", // adjust as needed
    })
        .status(200)
        .json("User has been logged out.");
};
exports.logout = logout;
