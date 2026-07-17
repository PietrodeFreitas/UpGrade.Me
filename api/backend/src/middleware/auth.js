import { config } from "../config.js";
import { sendJson } from "../utils/http.js";

/**
 * Exige header x-api-key igual a ADMIN_API_KEY.
 * @returns {boolean} true se a requisição foi barrada (resposta já enviada)
 */
export function requireAdminApiKey(req, res) {
  if (!config.adminApiKey) {
    sendJson(res, 503, {
      ok: false,
      error: "ADMIN_API_KEY não configurada no servidor.",
    });
    return true;
  }

  const provided = String(req.headers["x-api-key"] || "").trim();

  if (!provided || provided !== config.adminApiKey) {
    sendJson(res, 401, {
      ok: false,
      error: "Não autorizado. Envie o header x-api-key válido.",
    });
    return true;
  }

  return false;
}
