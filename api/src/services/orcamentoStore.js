import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { config } from "../config.js";

async function ensureDataFile() {
  await mkdir(config.dataDir, { recursive: true });

  try {
    await readFile(config.orcamentosFile, "utf8");
  } catch (error) {
    if (error && error.code === "ENOENT") {
      await writeFile(config.orcamentosFile, "[]\n", "utf8");
      return;
    }
    throw error;
  }
}

async function readAll() {
  await ensureDataFile();
  const raw = await readFile(config.orcamentosFile, "utf8");

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeAll(items) {
  await ensureDataFile();
  const tempFile = `${config.orcamentosFile}.${process.pid}.tmp`;
  await writeFile(tempFile, `${JSON.stringify(items, null, 2)}\n`, "utf8");
  await rename(tempFile, config.orcamentosFile);
}

export async function createOrcamento(input) {
  const items = await readAll();

  const orcamento = {
    id: randomUUID(),
    ...input,
    status: "novo",
    createdAt: new Date().toISOString(),
  };

  items.push(orcamento);
  await writeAll(items);

  return orcamento;
}

export async function listOrcamentos() {
  const items = await readAll();
  return items.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
}

export function getDataFilePath() {
  return path.basename(config.orcamentosFile);
}
