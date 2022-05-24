"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
const errors_utils_1 = require("../utils/errors.utils");
const sign_services_1 = require("./sign.services");
const signup = async (req, res) => {
    try {
        const result = await (0, sign_services_1.serviceSignup)(req);
        if (result)
            (0, exports.signin)(req, res);
    }
    catch (err) {
        (0, errors_utils_1.errorResponse)(err, res);
    }
};
exports.signup = signup;
const signin = async (req, res) => {
    try {
        const data = await (0, sign_services_1.serviceSignin)(req);
        if (data)
            res.status(200).json({
                message: "Connexion réussie",
                userUid: data.userUid,
                userRole: data.userRole,
                token: data.token,
            });
    }
    catch (err) {
        (0, errors_utils_1.errorResponse)(err, res);
    }
};
exports.signin = signin;
//# sourceMappingURL=sign.controllers.js.map