"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mysql2_1 = __importDefault(require("mysql2"));
dotenv_1.default.config({ path: "./config/.env" });
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server is running");
});
app.listen(port, () => {
    console.log(`⚡️[server]: Serv is running at http://localhost:${port}`);
});
const db = mysql2_1.default.createConnection({
    host: `${process.env.DB_HOST}`,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`,
});
db.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`⚡️[database]: Succefully connected to database: ${process.env.DB_NAME}`);
});
