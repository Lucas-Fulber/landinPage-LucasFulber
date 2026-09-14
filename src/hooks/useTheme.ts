import { useCallback, useEffect, useState } from "react";

export type Tema = "claro" | "escuro";

const CHAVE = "tema";

/**
 * Lê a escolha salva. O tema claro é o padrão, então só o "escuro"
 * precisa estar gravado — o mesmo critério usado pelo script inline
 * do index.html, que aplica a classe antes da primeira pintura.
 */
function temaInicial(): Tema {
  try {
    return localStorage.getItem(CHAVE) === "escuro" ? "escuro" : "claro";
  } catch {
    // localStorage bloqueado (janela privada): segue no padrão
    return "claro";
  }
}

export function useTheme() {
  const [tema, setTema] = useState<Tema>(temaInicial);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", tema === "escuro");

    try {
      localStorage.setItem(CHAVE, tema);
    } catch {
      // sem persistência quando o storage está indisponível
    }
  }, [tema]);

  const alternar = useCallback(
    () => setTema((atual) => (atual === "claro" ? "escuro" : "claro")),
    [],
  );

  return { tema, alternar };
}
