import { createApp } from "./app";
import { env } from "./config/env";
import { prisma } from "./lib/prisma";

const app = createApp();
const PORT = Number(env.PORT)  || 3000;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend WMS berjalan di http://0.0.0.0:${PORT} [${env.NODE_ENV}]`);
});

async function shutdown(signal: string) {
  console.log(`\n${signal} diterima, menutup server...`);
  server.close();
  await prisma.$disconnect();
  process.exit(0);
}

process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));
