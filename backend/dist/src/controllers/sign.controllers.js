"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const sign_services_1 = require("./sign.services");
const utils_controllers_1 = require("./utils.controllers");
const signup = async (req, res) => {
    try {
        const hashedPassword = await (0, utils_controllers_1.hashPassword)(req);
        (0, sign_services_1.addUser)(req, res, hashedPassword);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        (0, sign_services_1.logUser)(req, res);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
};
exports.login = login;
