"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const sign_services_1 = require("./sign.services");
const signup = (req, res) => {
    try {
        (0, sign_services_1.addUser)(req, res);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
};
exports.signup = signup;
const login = (req, res) => {
    try {
        (0, sign_services_1.logUser)(req, res);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
};
exports.login = login;
//# sourceMappingURL=sign.controllers.js.map