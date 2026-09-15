/**
 * Tokens de motion — ver ADR-004.
 *
 * O CSS não alcança o framer-motion, então as durações e o easing vivem aqui.
 * O easing espelha `--ease-out-soft` de `globals.css`: mudar um exige mudar o outro.
 *
 * Os componentes ainda declaram duração e easing à mão (sete durações diferentes,
 * medidas na auditoria AI-012). A migração é AI-019.
 */

/** Easing único de saída. Mesma curva de `--ease-out-soft`. */
export const easeOutSoft = [0.22, 1, 0.36, 1] as const;

/**
 * Três durações, por função:
 * - `feedback`: resposta a hover, foco e toque.
 * - `enter`: entrada de um elemento.
 * - `section`: entrada de um bloco de seção inteiro.
 */
export const duration = {
  feedback: 0.15,
  enter: 0.3,
  section: 0.5,
} as const;

/**
 * Deslocamento vertical da entrada de seção, em pixels.
 * Menor que os 30px atuais: a entrada deve ser percebida, não assistida.
 */
export const enterOffset = 12;

export type MotionDuration = keyof typeof duration;
