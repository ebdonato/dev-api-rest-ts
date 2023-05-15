import app from "./app";
import { PORT } from "./constants";
import log from "./helpers/logger";

app.listen(PORT, () => {
    log.info(`Server running at http://localhost:${PORT}`);
});
