import type { Locale } from "./config";
import ar from "./dictionaries/ar";
import en from "./dictionaries/en";

const dictionaries = { ar, en };

export function getDictionary(locale: Locale) {
  return dictionaries[locale] || dictionaries.ar;
}

export type Dictionary = typeof ar;
