const SERVICOS = new Set([
  "formatacao-pc",
  "restauracao-celular",
  "tablet",
  "backup",
  "outro",
]);

function asTrimmedString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function onlyDigits(value) {
  return value.replace(/\D/g, "");
}

/**
 * Valida e normaliza o payload de orçamento.
 * @returns {{ ok: true, data: object } | { ok: false, errors: string[] }}
 */
export function validateOrcamento(payload) {
  const errors = [];

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return { ok: false, errors: ["Body deve ser um objeto JSON."] };
  }

  const nome = asTrimmedString(payload.nome);
  const telefone = onlyDigits(asTrimmedString(payload.telefone));
  const aparelho = asTrimmedString(payload.aparelho);
  const servico = asTrimmedString(payload.servico) || "outro";
  const mensagem = asTrimmedString(payload.mensagem);

  if (nome.length < 2 || nome.length > 80) {
    errors.push("nome deve ter entre 2 e 80 caracteres.");
  }

  if (telefone.length < 10 || telefone.length > 13) {
    errors.push("telefone inválido. Use DDD + número (ex: 11999999999).");
  }

  if (aparelho.length > 80) {
    errors.push("aparelho deve ter no máximo 80 caracteres.");
  }

  if (!SERVICOS.has(servico)) {
    errors.push(`servico inválido. Use: ${[...SERVICOS].join(", ")}.`);
  }

  if (mensagem.length > 1000) {
    errors.push("mensagem deve ter no máximo 1000 caracteres.");
  }

  if (errors.length) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      nome,
      telefone,
      aparelho: aparelho || null,
      servico,
      mensagem: mensagem || null,
    },
  };
}
