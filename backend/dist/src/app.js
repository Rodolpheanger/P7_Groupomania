"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_utils_1 = require("./utils/errors.utils");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
require("../config/database");
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const posts_routes_1 = __importDefault(require("./routes/posts.routes"));
const app = (0, express_1.default)();
const port = process.env.PORT;
const client = process.env.CLIENT_URL;
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: client,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
}));
// **** Lancement du server ****
app.get("/", (req, res) => {
    res.status(200).send("Express + TypeScript Server is running");
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
// ***************************************************************************
// Mise en place des middlewares pour servir les uploads
app.use("/avatars", express_1.default.static(path_1.default.join(__dirname, "avatars")));
app.use("/images", express_1.default.static(path_1.default.join(__dirname, "posts_images")));
// Mise en place des routes
app.use("/api/user", users_routes_1.default);
app.use("/api/post", posts_routes_1.default);
// Renvoi des erreurs non catchés vers errors.util
app.use((err, req, res, next) => {
    console.log("Error in app.ts : ", err);
    (0, errors_utils_1.errorResponse)(err, res);
});
//# sourceMappingURL=app.js.map