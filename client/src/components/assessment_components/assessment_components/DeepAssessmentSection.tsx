import { MouseEvent, useState } from "react";
import { Col, Row } from "react-bootstrap";
import DeepAssessmentSectionSet from "./deep_assessment_components/DeepAssessmentSectionSet";
import { AssessmentQuestions } from "../../../utils/_assessmentQuestions";
import { SECTIONS, TABLE_NAME_LIST } from "../../../utils/data_map"
import Instructions from "../../instructions_components/Instructions";
import AssessmentDisplaySidebar from "../../../utils/AssessmentDisplaySidebar"

const DeepAssessmentSection = () => {
  const [pageIdx, setPageIdx] = useState<number>(0);

  return (
    <>
      <Row className={"deep-assessment-row"}>
        <Col md={2} className={"deep-assessment-col"}>
          <AssessmentDisplaySidebar sections={SECTIONS} idxState={pageIdx} setIdxState={setPageIdx}/>
        </Col>
        <Col md={10} className={"deep-assessment-col"}>
          <Instructions />
          {SECTIONS.map((_, i) => {
            return (
              <div
                key={i}
                className={
                  pageIdx === i
                    ? "deep-assessment-section-set-holder"
                    : "deep-assessment-section-set-holder hidden"
                }
              >
                <DeepAssessmentSectionSet
                  table={TABLE_NAME_LIST[i]}
                  set={AssessmentQuestions[i]}
                />
              </div>
            );
          })}
        </Col>
      </Row>
    </>
  );
};

export default DeepAssessmentSection;
