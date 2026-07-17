import http from "node:http";
import { config } from "./config.js";
import { applyCors, handlePreflight } from "./middleware/cors.js";
import { handleRequest } from "./routes/router.js";
import { sendJson } from "./utils/http.js";

const server = http.createServer(async (req, res) => {
  try {
    applyCors(req, res);

    if (handlePreflight(req, res)) return;

    await handleRequest(req, res);
  } catch (error) {
    const statusCode = Number(error?.statusCode) || 500;
    const message =
      statusCode >= 500
        ? "Erro interno do servidor"
        : error?.message || "Falha na requisição";

    console.error("[API]", error);
    sendJson(res, statusCode, {
      ok: false,
      error: message,
    });
  }
});

server.listen(config.port, () => {
  console.log(`UpGrade.Me API rodando em http://localhost:${config.port}`);
  console.log(`Health: http://localhost:${config.port}/health`);
  console.log(`Config: http://localhost:${config.port}/config`);
});
