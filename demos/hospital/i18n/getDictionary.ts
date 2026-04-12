import type { Locale } from "./config";
import ar from "./dictionaries/ar";
import en from "./dictionaries/en";
import type { Dictionary } from "./dictionaries/ar";

const dictionaries: Record<Locale, Dictionary> = { ar, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.ar;
}

export type { Dictionary };
