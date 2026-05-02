import jwt from "jsonwebtoken";
import { Admin } from "../models/adminModel.js";

const authenticateAdmin = async (req, res, next) => {
  try {
    let token = req.cookies.token;

    if (!token) {
      const err = new Error("Unauthorized");
      err.status = 401;
      return next(err);
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decode.id);
    if (!admin) {
      const err = new Error("Unauthorized");
      err.status = 401;
      return next(err);
    }
    req.admin = admin;
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticateAdmin;
