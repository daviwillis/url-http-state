import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function removerSpecials(texto: string) {
  // eliminando acentuação
  texto = texto.replace(/[ÀÁÂÃÄÅ]/, "A");
  texto = texto.replace(/[àáâãäå]/, "a");
  texto = texto.replace(/[ÈÉÊË]/, "e");
  texto = texto.replace(/[èéêË]/, "e");
  texto = texto.replace(/[ìíî]/, "i");
  texto = texto.replace(/[óòõôö]/, "o");
  texto = texto.replace(/[Ç]/, "c");
  texto = texto.replace(/[ç]/, "c");
  return texto.replace(/[^a-z0-9]/gi, "");
}
