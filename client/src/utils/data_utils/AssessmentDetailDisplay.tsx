import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import AssessmentDisplaySidebar from "../AssessmentDisplaySidebar";
import { SECTIONS } from "./data_map";
import { TAssessmentDetailDisplay} from "../typings/_types"

const AssessmentDetailDisplay = ({ data }: TAssessmentDetailDisplay) => {
  const [pageIdx, setPageIdx] = useState<number>(0);
  return (
    <>
      {data.length > 0 ? (
        <Row className={"data-assessment-detail-row "}>
          <Col md={2} className={"data-assessment-detail-col"}>
            <AssessmentDisplaySidebar
              sections={SECTIONS}
              idxState={pageIdx}
              setIdxState={setPageIdx}
            />
          </Col>
          <Col md={10} className={"data-assessment-detail-col"}>
            {data.map((d: any, i: number) => {
              return (
                <div
                  key={i}
                  className={
                    pageIdx === i
                      ? "data-assessment-detail-holder"
                      : "data-assessment-detail-holder hidden"
                  }
                >
                  <table style={{ textAlign: "left", margin: "5px" }}>
                    <thead>
                      <tr className={"data-assessment-detail-tr-head"}>
                        <th>
                          <h5>No.</h5>
                        </th>
                        <th>
                          <h5>Question</h5>
                        </th>
                        <th>
                          <h5>Answer</h5>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {d.map(({ question, answer }: any, i: number) => {
                        return (
                          <tr
                            key={i}
                            className={"data-assessment-detail-tr-body"}
                          >
                            <td>{i + 1}</td>
                            <td>{question}</td>
                            <td>{answer}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </Col>
        </Row>
      ) : (
        <h3>no assessment selected</h3>
      )}
    </>
  );
};

export default AssessmentDetailDisplay;
