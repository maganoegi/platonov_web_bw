import { type CSSProperties } from 'react';

import type { Lang } from "../../i18n/types";
import { useI18n } from "../../i18n/I18nProvider";

const APP_VERSION = import.meta.env.VITE_APP_VERSION ?? "dev";

const fourSpans = (
  <>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </>
);

function LangBtn({ code }: { code: Lang }) {
  const { lang, setLang } = useI18n();
  // parity: active language was animated; we’ll keep the class selectors identical and
  // drive the same background changes from the legacy animation hook (not here).
  return (
    <li>
      <div className={`smaller ${code}`} onClick={() => setLang(code)} aria-pressed={lang === code}>
        {code}
        {fourSpans}
      </div>
    </li>
  );
}

const styles = {
    bottomLeftCornerStyles: {
    position: 'fixed',
    bottom: '10px',
    left: '10px',
    fontSize: '0.7rem',
    color: 'grey',
  } as CSSProperties,
}

export function Footer() {
  return (
    <footer className="footer">
      <ul className="myFoot">
        <LangBtn code="en" />
        <LangBtn code="fr" />
        <LangBtn code="es" />
        <LangBtn code="ru" />
        <LangBtn code="nl" />
      </ul>
      <div style={styles.bottomLeftCornerStyles}>version: {APP_VERSION}</div>
    </footer>
  );
}
