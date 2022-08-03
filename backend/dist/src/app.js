"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
require("../config/database");
const errors_utils_1 = require("./utils/errors.utils");
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const posts_routes_1 = __importDefault(require("./routes/posts.routes"));
const comments_routes_1 = __importDefault(require("./routes/comments.routes"));
const likes_routes_1 = __importDefault(require("./routes/likes.routes"));
const app = (0, express_1.default)();
const port = process.env.PORT;
const client = process.env.CLIENT_URL;
app.use(express_1.default.json());
app.use((0, helmet_1.default)({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use((0, cors_1.default)({
    origin: client,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
}));
// * Lancement du server *
app.get("/", (req, res) => {
    res.status(200).send("Express + TypeScript Server is running");
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
// * Définition des "chemins statics" des dossiers recevants les avatars et les images *
app.use("/avatar", express_1.default.static("uploads/avatars"));
app.use("/post_image", express_1.default.static("uploads/posts_images"));
// * Mise en place des routes
app.use("/api/users", users_routes_1.default);
app.use("/api/posts", posts_routes_1.default);
app.use("/api/comments", comments_routes_1.default);
app.use("/api/likes", likes_routes_1.default);
// * Renvoi des erreurs "non catchés" vers errors.util
app.use((err, req, res, next) => {
    console.log("Error in app.ts : ", err);
    (0, errors_utils_1.errorResponse)(err, res);
});
//# sourceMappingURL=app.js.map