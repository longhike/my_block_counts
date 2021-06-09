import { MouseEvent, useState } from "react";
import { Col, Row } from "react-bootstrap";
import DeepAssessmentSectionSet from "./deep_assessment_components/DeepAssessmentSectionSet";
import { AssessmentQuestions } from "../../../utils/_assessmentQuestions";
import Instructions from "../../instructions_components/Instructions";

const DeepAssessmentSection = () => {
  const [pageIdx, setPageIdx] = useState<number>(0);

  const sections: string[] = [
    "General",
    "Stores",
    "Industry",
    "Disorder",
    "Housing",
    "Services",
    "Transit",
    "Health",
  ];

  const tableMap: string[] = [
    "general_features_dq",
    "stores_dq",
    "industry_dq",
    "physical_disorder_dq",
    "housing_dq",
    "public_services_dq",
    "public_transit_dq",
    "health_dq",
  ];

  return (
    <>
      <Row className={"deep-assessment-row"}>
        <Col md={2} className={"deep-assessment-col"}>
          <table className="sidebar-list">
            <tbody>
              {sections.map((el, i) => {
                return (
                  <tr
                    key={`${i}`}
                    className={
                      pageIdx === i
                        ? "sidebar-list-item active"
                        : "sidebar-list-item"
                    }
                    onClick={(e: MouseEvent<HTMLElement>) => {
                      e.preventDefault();
                      setPageIdx((cur) => i);
                    }}
                    onMouseEnter={(e: MouseEvent<HTMLElement>) => {
                      e.preventDefault();
                      e.currentTarget.classList.add("hover");
                    }}
                    onMouseLeave={(e: MouseEvent<HTMLElement>) => {
                      e.preventDefault();
                      e.currentTarget.classList.remove("hover");
                    }}
                  >
                    <td>{el}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Col>
        <Col md={10} className={"deep-assessment-col"}>
          <Instructions />
          {sections.map((el, i) => {
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
                  table={tableMap[i]}
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
