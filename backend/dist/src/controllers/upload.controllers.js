"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAvatar = void 0;
const errors_utils_1 = require("./../utils/errors.utils");
const upload_services_1 = require("./upload.services");
const setAvatar = async (req, res) => {
    try {
        const result = await (0, upload_services_1.serviceSetAvatarUrl)(req);
        if (result)
            res.status(200).json({ message: "Avatar modifié avec succès" });
    }
    catch (err) {
        (0, errors_utils_1.errorResponse)(err, res);
    }
};
exports.setAvatar = setAvatar;
//# sourceMappingURL=upload.controllers.js.map