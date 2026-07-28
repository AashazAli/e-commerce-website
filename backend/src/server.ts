console.log("SERVER.TS LOADED");
import app from "./app";
import { env } from "./config/env";

app.listen(env.PORT, () => {
    console.log(`
========================================
🚀 Cemev API Running
Port : ${env.PORT}
========================================
`);
});