export function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
  });
  res.end(body);
}

export function readJsonBody(req, { maxBytes = 32_768 } = {}) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];

    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > maxBytes) {
        reject(Object.assign(new Error("Payload muito grande"), { statusCode: 413 }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });

    req.on("end", () => {
      if (chunks.length === 0) {
        resolve({});
        return;
      }

      try {
        const raw = Buffer.concat(chunks).toString("utf8");
        resolve(JSON.parse(raw));
      } catch {
        reject(Object.assign(new Error("JSON inválido"), { statusCode: 400 }));
      }
    });

    req.on("error", reject);
  });
}

export function getPathname(url) {
  try {
    let pathname = new URL(url, "http://localhost").pathname.replace(/\/+$/, "") || "/";
    if (pathname === "/api" || pathname.startsWith("/api/")) {
      pathname = pathname.slice(4) || "/";
    }
    return pathname;
  } catch {
    return "/";
  }
}
