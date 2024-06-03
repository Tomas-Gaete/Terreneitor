// logger.js
import winston from "winston";
const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
	level: "debug",
	format: combine(timestamp(), json()),
	transports: [
		new winston.transports.File({
			filename: "app.log",
		}),
	],
});

export { logger };
