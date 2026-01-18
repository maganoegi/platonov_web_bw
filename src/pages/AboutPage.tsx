import { useI18n } from "../i18n/I18nProvider";
import { useNavigate } from "react-router-dom";
import { useAboutFlipOnScroll } from "../hooks/useAboutFlipOnScroll";

const fourSpans = (
  <>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </>
);

export function AboutPage() {
  const { t, tHtml } = useI18n();
  const navigate = useNavigate();

  useAboutFlipOnScroll(); // ports your scroll flipping logic

  return (
    <div className="sectionContent">
      <div className="backbtn snakebtn" onClick={() => navigate("/")}>
        {t("back")}
        {fourSpans}
      </div>

      <div className="sectionTitle">{t("about.title")}</div>

      {/* keep the same classnames */}
      <div className="aboutPlusImages">
        <div
          className="aboutContent"
          dangerouslySetInnerHTML={{ __html: tHtml("about.content") }}
        />
        {/* IMPORTANT: you will paste your exact flip-grid markup here (ids preserved) */}
        <div className="aboutImages">{/* AboutImages.tsx goes here */}</div>
      </div>
    </div>
  );
}
