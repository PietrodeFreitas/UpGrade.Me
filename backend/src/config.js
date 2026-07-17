import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const config = {
  port: Number(process.env.PORT) || 3333,
  dataDir: path.resolve(__dirname, "../data"),
  orcamentosFile: path.resolve(__dirname, "../data/orcamentos.json"),
  corsOrigin: process.env.CORS_ORIGIN || "*",
};
