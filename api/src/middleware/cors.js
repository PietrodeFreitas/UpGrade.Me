import { config } from "../config.js";

export function applyCors(req, res) {
  res.setHeader("Access-Control-Allow-Origin", config.corsOrigin);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-api-key");
  res.setHeader("Access-Control-Max-Age", "86400");
}

export function handlePreflight(req, res) {
  if (req.method !== "OPTIONS") return false;
  applyCors(req, res);
  res.writeHead(204);
  res.end();
  return true;
}
