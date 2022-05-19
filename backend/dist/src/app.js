"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
dotenv_1.default.config();
require("../config/database");
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const posts_routes_1 = __importDefault(require("./routes/posts.routes"));
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
// Mise en place des routes
app.use("/api/user", users_routes_1.default);
app.use("/api/post", posts_routes_1.default);
// **** Lancement du server ****
app.get("/", (req, res) => {
    res.status(200).send("Express + TypeScript Server is running");
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
// ***************************************************************************
//# sourceMappingURL=app.js.map