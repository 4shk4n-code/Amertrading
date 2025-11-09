"use client";

import { useEffect } from "react";
import { Locale, isRTL } from "@/lib/i18n";

type LocaleAttributesProps = {
  locale: Locale;
};

export function LocaleAttributes({ locale }: LocaleAttributesProps) {
  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    if (isRTL(locale)) {
      root.dir = "rtl";
      root.classList.add("rtl");
    } else {
      root.dir = "ltr";
      root.classList.remove("rtl");
    }
  }, [locale]);

  return null;
}

