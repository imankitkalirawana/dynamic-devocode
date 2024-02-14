import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "@/utils/keys";
import exp from "constants";

const verifyAdmin = (req, res, next) => {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: "Unauthorized" });
      } else {
        if (decoded.role === "admin") {
          console.log("Admin verified");
          req.userId = decoded.userId;
          next();
        } else {
          res.status(403).json({ error: "Forbidden" });
        }
      }
    });
  } else {
    res.status(401).json({ error: "No token passed" });
  }
};

export default verifyAdmin;
