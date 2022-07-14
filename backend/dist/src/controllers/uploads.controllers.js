"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setAvatar = void 0;
const errors_utils_1 = require("../utils/errors.utils");
const uploads_services_1 = require("./uploads.services");
const setAvatar = async (req, res) => {
    const file = req.file;
    const requestUserUid = req.requestUserUid;
    const avatarOwner = req.body.avatarOwnerUid;
    const protocol = req.protocol;
    const host = req.get("host");
    try {
        const result = await (0, uploads_services_1.serviceSetAvatarUrl)(file, requestUserUid, avatarOwner, protocol, host);
        if (result)
            res
                .status(200)
                .json({ message: "Avatar modifié avec succès", avatarUrl: result });
    }
    catch (err) {
        (0, errors_utils_1.errorResponse)(err, res);
    }
};
exports.setAvatar = setAvatar;
//# sourceMappingURL=uploads.controllers.js.map