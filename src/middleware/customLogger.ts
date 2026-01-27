import morgan from "morgan";
import fs from "fs";
import path from "path";

// Create logs directory if it doesn't exist
const logsDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// Create a write stream for access logs
const accessLogStream = fs.createWriteStream(
    path.join(logsDir, "access.log"),
    { flags: "a" } // Append mode
);

// Custom token for date/time
morgan.token("date", () => {
    return new Date().toISOString();
});

// Custom format for logging (includes date, method, URL, status, response time, content length, and remote address)
const logFormat = ':date :method :url :status :response-time ms - :res[content-length] :remote-addr';

// Create a stream that writes to both file and console
const dualStream = {
    write: (message: string) => {
        // Write to file
        accessLogStream.write(message);
        // Also write to console
        process.stdout.write(message);
    }
};

// Create logger middleware that logs to both file and console
export const customLogger = morgan(logFormat, {
    stream: dualStream
});


