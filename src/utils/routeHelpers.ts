import type { Language } from "../contexts/LanguageContext.js";

// Return a path without any language prefix. The `language` argument is kept
// for compatibility with existing call sites but is ignored.
export function localizePath(_language: Language, path: string) {
  let p = path.startsWith('/') ? path : `/${path}`;

  // remove leading /en or /uk if present
  p = p.replace(/^\/(en|uk)(?=\/|$)/, '');

  if (!p) return '/';
  return p.startsWith('/') ? p : `/${p}`;
}

export function stripLangPrefix(path: string) {
  const p = (path.startsWith('/') ? path : `/${path}`).replace(/^\/(en|uk)(?=\/|$)/, '');
  return p || '/';
}
