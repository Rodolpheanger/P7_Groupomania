"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const sign_services_1 = require("./sign.services");
const signup = async (req, res) => {
    try {
        const result = await (0, sign_services_1.addUser)(req);
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
        const result = await (0, sign_services_1.logUser)(req);
        console.log(result);
        result === "NoUser"
            ? res.status(404).json({ message: "Utilisateur non trouvé" })
            : result === "WrongPassword"
                ? res.status(401).json({ error: "Mot de passe incorrect !" })
                : res.status(200).json({
                    message: "Connexion réussie",
                    uid: result.uid,
                    token: result.token,
                });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
};
exports.signin = signin;
//# sourceMappingURL=sign.controllers.js.map