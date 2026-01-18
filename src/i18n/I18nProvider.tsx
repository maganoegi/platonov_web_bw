import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { International, Lang } from "./types";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  data: International | null;
  t: (path: string) => string;
  tHtml: (path: string) => string; // converts \n -> <br/>
};

const I18nContext = createContext<Ctx | null>(null);

function getByPath(obj: any, path: string): any {
  return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [data, setData] = useState<International | null>(null);

  useEffect(() => {
    // keep the same location: /resources/international.json
    fetch("/resources/international.json", { cache: "no-store" })
      .then((r) => r.json())
      .then((json) => setData(json))
      .catch(() => setData(null));
  }, []);

  const value = useMemo<Ctx>(() => {
    const t = (path: string) => {
      if (!data) return "";
      const v = getByPath(data[lang], path);
      return typeof v === "string" ? v : "";
    };
    const tHtml = (path: string) => t(path).replace(/\n/g, "<br/>");
    return { lang, setLang, data, t, tHtml };
  }, [data, lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
