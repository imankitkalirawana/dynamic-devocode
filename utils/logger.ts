import {
    createLogger,
    format,
    transports,
} from "winston";
import "winston-mongodb";


const logger = createLogger({
    level: "info",
    format: format.combine(
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json(),
    ),
    defaultMeta: { service: "user-service" },
    transports: [
        new transports.File({ filename: "error.log", level: "error" }),
        new transports.File({ filename: "combined.log" }),

    ],
});

if (process.env.NEXT_PUBLIC_NODE_ENV !== "production") {
    logger.add(new transports.Console({
        format: format.combine(
            format.colorize(),
            format.simple(),

        ),
    }));
}

if (process.env.NEXT_PUBLIC_NODE_ENV === "production") {
    logger.add(new transports.MongoDB({
        db: process.env.NEXT_PUBLIC_MONGO_URL || "",
        options: { useUnifiedTopology: true },
        collection: "logs",
        level: "info",
        format: format.combine(
            format.timestamp(),
            format.json(),
            format.metadata(),
        )
    }),);
}

export default logger;
