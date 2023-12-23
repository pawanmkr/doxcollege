import { Request, Response } from "express";
import { User } from "../database/queries/user.js";
import dotenv from "dotenv";
import path from "path";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import crypto from "crypto";
import { Query, QueryResultRow } from "pg";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});
const JWT_SECRET_KEY: Secret = process.env.JWT_SECRET_KEY;
if (JWT_SECRET_KEY === undefined) {
  throw new Error("JWT_SECRET NOT FOUND");
}

/*
 * UserController Class for all user related operations
 */
export class UserController {
  static async registerNewUser(req: Request, res: Response) {
    if (!req.body.fullName || !req.body.email || !req.body.password) {
      res.status(404).send("Fill all required fields");
      return;
    }
    const { fullName, email, password } = req.body;
    const hashedPassword: string = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    const existingUser: boolean = await User.doesEmailAlreadyExists(email);
    if (existingUser) {
      res.status(409).send("Email Already Exists");
      return;
    }
    const registeredUser = await User.addNewUserToDB(
      fullName,
      email,
      hashedPassword
    );
    if (registeredUser === null) {
      res.status(500).send("Adding user to DB was unsuccessful!");
      return;
    }

    const payload: JwtPayload = {
      userId: registeredUser.id,
      fullName: fullName,
      email: email,
    };

    const token: string = jwt.sign(payload, JWT_SECRET_KEY);

    res.status(201).json({
      token: token,
    });
  }

  static async login(req: Request, res: Response) {
    if (!req.body.email || !req.body.password) {
      res.status(404).send("Fill all required fields");
      return;
    }
    const { email, password } = req.body;
    const hashedPassword: string = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    const existingUser: QueryResultRow = await User.doesUserAlreadyExists(email);
    if (!existingUser) {
      res.status(404).send("User does not exists");
      return;
    }

    if (existingUser.password !== hashedPassword) {
      res.status(404).send("email or passowrd is incorrect");
      return;
    }

    const payload: JwtPayload = {
      userId: existingUser.id,
      fullName: existingUser.full_name,
      email: existingUser.email,
    };

    const token: string = jwt.sign(payload, JWT_SECRET_KEY);

    res.status(201).json({
      token: token,
    });
  }

  static async getUserProfile(req, res) {
    const id = req.params.id;
    if (!id) {
      return res.sendStatus(400).send("Invalid Request, UserID not specified");
    }

    let user = await User.getProfile(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    return res.send(user);
  }
}