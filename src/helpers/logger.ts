import logger from "pino";
import dayjs from "dayjs";
import { LOG_TO_FILE } from "../constants";

const transport =
    LOG_TO_FILE === "true"
        ? {
              target: "pino/file",
              options: { destination: "./pino.log" },
          }
        : {
              target: "pino-pretty",
          };

const log = logger({
    transport,
    level: "info",
    base: {
        pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;
