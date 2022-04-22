"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.getUsers = void 0;
const database_1 = require("../../config/database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUsers = (req, res) => {
    database_1.db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            res.status(400).json({ err });
        }
        else {
            res.status(200).json(result);
        }
    });
};
exports.getUsers = getUsers;
const addUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt_1.default.hash(req.body.password, 10);
        database_1.db.query(`
      INSERT INTO users (
        username,
        password,
        email,
        firstname,
        lastname,
        inscription_date
        ) VALUES (
          "${req.body.username}",
          "${hashedPassword}",
          "${req.body.email}",
          "${req.body.firstname}",
          "${req.body.lastname}",
          NOW());
        `, (err, result) => {
            if (err)
                throw err;
            res.status(201).json({ message: "User added successfully" });
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ err });
    }
};
exports.addUser = addUser;
