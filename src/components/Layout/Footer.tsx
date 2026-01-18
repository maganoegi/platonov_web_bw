import type { Lang } from "../../i18n/types";
import { useI18n } from "../../i18n/I18nProvider";

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

export function Footer() {
  return (
    <ul className="myFoot">
      <LangBtn code="en" />
      <LangBtn code="fr" />
      <LangBtn code="es" />
      <LangBtn code="ru" />
      <LangBtn code="nl" />
    </ul>
  );
}
