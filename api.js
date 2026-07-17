import http from "node:http";
import { config } from "./api/src/config.js";
import { applyCors, handlePreflight } from "./api/src/middleware/cors.js";
import { handleRequest } from "./api/src/routes/router.js";
import { sendJson } from "./api/src/utils/http.js";

export default async function handler(req, res) {
  try {
    applyCors(req, res);

    if (handlePreflight(req, res)) return;

    await handleRequest(req, res);
  } catch (error) {
    const rawStatus = Number(error?.statusCode);
    const statusCode = Number.isFinite(rawStatus) && rawStatus > 0 ? rawStatus : 500;
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
}
