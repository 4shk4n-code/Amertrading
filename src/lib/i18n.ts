export const locales = ["en", "ar", "fa"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isRTL(locale: Locale) {
  return locale === "ar" || locale === "fa";
}

export async function getMessages(locale: Locale) {
  try {
    let mod;
    switch (locale) {
      case "ar":
        mod = await import("@/messages/ar.json");
        break;
      case "fa":
        mod = await import("@/messages/fa.json");
        break;
      case "en":
      default:
        mod = await import("@/messages/en.json");
        break;
    }
    // JSON imports in Next.js can be either mod.default or mod itself
    return mod.default || mod;
  } catch (error) {
    // Fallback to English if import fails
    try {
      const mod = await import("@/messages/en.json");
      return mod.default || mod;
    } catch {
      return {};
    }
  }
}

