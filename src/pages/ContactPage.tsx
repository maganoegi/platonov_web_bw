import { useI18n } from "../i18n/I18nProvider";
import { useNavigate } from "react-router-dom";
import { ContactForm } from "../components/Contact/ContactForm";

const fourSpans = (
  <>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </>
);

export function ContactPage() {
  const { t } = useI18n();
  const navigate = useNavigate();

  return (
    <div className="sectionContent">
      <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
        <li>
          <div className="backbtn snakebtn" onClick={() => navigate("/")}>
            {t("back")}
            {fourSpans}
            <span></span><span></span><span></span><span></span>
          </div>
        </li>
      </ul>

      <div className="sectionTitle">{t("contact.title")}</div>

      {/* keep any legacy containers you referenced (spotifyContainer) */}
      <div className="spotifyContainer" style={{ display: "none", opacity: 0 }} />

      <ContactForm />
    </div>
  );
}
