import { useI18n } from "../i18n/I18nProvider";
import { useNavigate } from "react-router-dom";
import { useAboutFlipOnScroll } from "../hooks/useAboutFlipOnScroll";
import { AboutImages } from "../components/About/AboutImages";

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
      <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
        <li>
          <div className="backbtn snakebtn" onClick={() => navigate("/")}>
            {t("back")}
            {fourSpans}
            <span></span><span></span><span></span><span></span>
          </div>
        </li>
      </ul>

      <div className="sectionTitle">{t("about.title")}</div>

      {/* keep the same classnames */}
      <div className="aboutPlusImages">
        <div
          className="aboutContent"
          dangerouslySetInnerHTML={{ __html: tHtml("about.content") }}
        />
      <div className="aboutPlusImages">
        <div
          className="aboutContent"
          dangerouslySetInnerHTML={{ __html: tHtml("about.content") }}
        />
        <AboutImages />
      </div>
    </div>
    </div>
  );
}

