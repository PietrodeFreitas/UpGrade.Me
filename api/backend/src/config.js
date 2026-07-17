import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv } from "./loadEnv.js";

loadEnv();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function envString(key, fallback = "") {
  const value = process.env[key];
  if (value === undefined || value === null || String(value).trim() === "") {
    return fallback;
  }
  return String(value).trim();
}

export const config = {
  port: Number(process.env.PORT) || 3333,
  dataDir: path.resolve(__dirname, "../data"),
  orcamentosFile: path.resolve(__dirname, "../data/orcamentos.json"),
  corsOrigin: envString("CORS_ORIGIN", "*"),
  whatsappNumber: envString("WHATSAPP_NUMBER", "5519992538677").replace(/\D/g, ""),
  instagramUrl: envString("INSTAGRAM_URL", ""),
  whatsappGroupUrl: envString("WHATSAPP_GROUP_URL", ""),
  recommendationChannelUrl: envString("RECOMMENDATION_CHANNEL_URL", ""),
  adminApiKey: envString("ADMIN_API_KEY", ""),
  business: {
    aceitaTablet: true,
    naoFazHardware: true,
  },
};

export function getPublicConfig() {
  return {
    whatsappNumber: config.whatsappNumber,
    whatsappUrl: config.whatsappNumber
      ? `https://wa.me/${config.whatsappNumber}`
      : null,
    instagramUrl: config.instagramUrl || null,
    whatsappGroupUrl: config.whatsappGroupUrl || null,
    recommendationChannelUrl: config.recommendationChannelUrl || null,
    business: { ...config.business },
  };
}
