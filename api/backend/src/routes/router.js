import { getPublicConfig } from "../config.js";
import { requireAdminApiKey } from "../middleware/auth.js";
import { createOrcamento, listOrcamentos } from "../services/orcamentoStore.js";
import { getPathname, readJsonBody, sendJson } from "../utils/http.js";
import { validateOrcamento } from "../utils/validateOrcamento.js";

export async function handleRequest(req, res) {
  const pathname = getPathname(req.url);
  const method = req.method || "GET";

  if (method === "GET" && (pathname === "/" || pathname === "/health")) {
    sendJson(res, 200, {
      ok: true,
      service: "UpGrade.Me API",
      version: "1.0.0",
      endpoints: {
        health: "GET /health",
        config: "GET /config",
        createOrcamento: "POST /orcamentos",
        listOrcamentos: "GET /orcamentos (requer x-api-key)",
      },
    });
    return;
  }

  if (method === "GET" && pathname === "/config") {
    sendJson(res, 200, {
      ok: true,
      data: getPublicConfig(),
    });
    return;
  }

  if (method === "POST" && pathname === "/orcamentos") {
    const body = await readJsonBody(req);
    const validation = validateOrcamento(body);

    if (!validation.ok) {
      sendJson(res, 400, {
        ok: false,
        error: "Dados inválidos",
        details: validation.errors,
      });
      return;
    }

    const orcamento = await createOrcamento(validation.data);

    sendJson(res, 201, {
      ok: true,
      message: "Orçamento recebido com sucesso.",
      data: {
        id: orcamento.id,
        status: orcamento.status,
        createdAt: orcamento.createdAt,
      },
    });
    return;
  }

  if (method === "GET" && pathname === "/orcamentos") {
    if (requireAdminApiKey(req, res)) return;

    const items = await listOrcamentos();
    sendJson(res, 200, {
      ok: true,
      total: items.length,
      data: items,
    });
    return;
  }

  sendJson(res, 404, {
    ok: false,
    error: "Rota não encontrada",
  });
}
