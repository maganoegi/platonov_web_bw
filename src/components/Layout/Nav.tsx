import { useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n/I18nProvider";


const fourSpans = (
  <>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </>
);

export function Nav() {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <ul id="myNav">
      <li>
        <div className="snakebtn about" onClick={() => navigate("/about")}>
          {t("about.nav")}
          {fourSpans}
        </div>
      </li>
      <li>
        <div className="snakebtn work" onClick={() => navigate("/work")}>
          {t("work.nav")}
          {fourSpans}
        </div>
      </li>
      <li>
        <div className="snakebtn contact" onClick={() => navigate("/contact")}>
          {t("contact.nav")}
          {fourSpans}
        </div>
      </li>
    </ul>
  );
}
