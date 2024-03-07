// cors.ts
import Cors from "micro-cors";

const cors = Cors({
  allowedMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  origin: [
    "https://devocode.vercel.app",
    "https://devocode.in",
    "https://www.devocode.in",
    "http://localhost:5173",
    "http://localhost:3000",
    
  ],
  optionsSuccessStatus: 204,
});

export default cors;
