const winston = require("winston");
const { NODE_ENV } = require("./serverConfig");

const logger = winston.createLogger({
  level: NODE_ENV === "development" ? "debug" : "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    NODE_ENV === "development" ? winston.format.colorize() : winston.format.uncolorize(),
    NODE_ENV === "development" 
      ? winston.format.printf((info) => `${info.timestamp} [${info.level}]: ${info.message}`)
      : winston.format.json()
  ),
  defaultMeta: { service: "submission-service" },
  transports: [
    new winston.transports.Console()
  ],
});

module.exports = logger;
