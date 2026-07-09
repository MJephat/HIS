// import dotenv from "dotenv";
import app from "./app.js";
import env from "./shared/config/env.js";
import logger from "./shared/config/logger.js";

// dotenv.config();

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})