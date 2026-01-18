import { useI18n } from "../i18n/I18nProvider";
import { useNavigate } from "react-router-dom";
import { ProjectsGrid } from "../components/Work/ProjectsGrid";

const fourSpans = (
  <>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </>
);

export function WorkPage() {
  const { t, tHtml } = useI18n();
  const navigate = useNavigate();

  return (
    <div className="sectionContent">
      <div className="backbtn snakebtn" onClick={() => navigate("/")}>
        {t("back")}
        {fourSpans}
      </div>

      <div className="sectionTitle">{t("work.title")}</div>

      <div className="workContent">
        <div className="title GenDescTitle">{t("work.GenDescTitle")}</div>
        <div
          className="GenDescContent"
          dangerouslySetInnerHTML={{ __html: tHtml("work.GenDescContent") }}
        />

        <div className="title WhatDoIKnow">{t("work.WhatDoIKnow")}</div>
        <div className="ProgLanguageGrid">{/* keep your old markup if it existed */}</div>

        <div className="title OpenSource">{t("work.OpenSource")}</div>
        <ProjectsGrid username="maganoegi" />
      </div>
    </div>
  );
}
