"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const sign_services_1 = require("./sign.services");
const signup = async (req, res) => {
    try {
        const result = await (0, sign_services_1.serviceSignup)(req);
        result ? (0, exports.signin)(req, res) : res.status(400).json({ message: result });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
};
exports.signup = signup;
const signin = async (req, res) => {
    try {
        const result = await (0, sign_services_1.serviceSignin)(req);
        result === "NoUser"
            ? res.status(404).json({ message: "Utilisateur non trouvé" })
            : result === "WrongPassword"
                ? res.status(401).json({ error: "Mot de passe incorrect !" })
                : /*(res.cookie("jwt", result.token, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000,
                  }),*/
                    res.status(200).json({
                        message: "Connexion réussie",
                        userUid: result.userUid,
                        userIsAdmin: result.userIsAdmin,
                        token: result.token,
                    });
        /*);*/
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
};
exports.signin = signin;
//# sourceMappingURL=sign.controllers.js.map