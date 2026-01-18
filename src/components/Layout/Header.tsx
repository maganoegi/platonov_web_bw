import { useI18n } from "../../i18n/I18nProvider";

export function Header() {
  const { t } = useI18n();
  return (
    <div className="hi noSelect">
      {t("name")}
      <span></span><span></span><span></span><span></span>
    </div>
  );
}
