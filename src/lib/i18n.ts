export const locales = ["en", "ar", "fa"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isRTL(locale: Locale) {
  return locale === "ar" || locale === "fa";
}

export function getMessages(locale: Locale) {
  switch (locale) {
    case "ar":
      return import("@/messages/ar.json").then((mod) => mod.default);
    case "fa":
      return import("@/messages/fa.json").then((mod) => mod.default);
    case "en":
    default:
      return import("@/messages/en.json").then((mod) => mod.default);
  }
}

