"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
// import mysql from "mysql2/promise";
exports.db = mysql2_1.default.createConnection({
    host: `${process.env.DB_HOST}`,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`,
});
exports.db.connect((err) => {
    if (err) {
        console.log("Connexion ko", err);
        return;
    }
    console.log(`⚡️[database]: Succefully connected to database: ${process.env.DB_NAME}`);
});
// export async function db() {
//   const con = await mysql.createConnection({
//     host: `${process.env.DB_HOST}`,
//     user: `${process.env.DB_USER}`,
//     password: `${process.env.DB_PASSWORD}`,
//     database: `${process.env.DB_NAME}`,
//   });
//   return con;
// }
//# sourceMappingURL=database.js.map