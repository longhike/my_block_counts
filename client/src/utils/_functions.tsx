import { ReactElement, MouseEvent, ChangeEvent } from "react";
import { Col, Form, Row } from "react-bootstrap";

export const deepAssessmentQuestionsRenderer: (
  _n: string,
  _q: string,
  _t: string,
  _p: string[] | null,
  changeTarget: any,
  changeHandler: any
) => ReactElement | string = (
  _n: string,
  _q: string,
  _t: string,
  _p: string[] | null,
  changeTarget: any,
  changeHandler: any
) => {
  switch (_t) {
    case "input":
      return (
        <div key={_n}>
          <Form.Control
            name={_n}
            value={changeTarget}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              changeHandler(e.currentTarget.value)
            }
            type="text"
            placeholder="Answer Here"
          />
        </div>
      );
    case "options":
      return (
        <div key={_n}>
            {_p
              ? _p.map((el) => {
                  return (     
                    <div 
                      key={el.split(" ").join("-")}
                      data-value={el}
                      className={changeTarget === el ? "deep-assessment-option-button selected" : "deep-assessment-option-button"}
                      onClick={(e: MouseEvent<HTMLElement>) => {
                        e.preventDefault();
                        changeHandler(e.currentTarget.textContent)
                      }}
                    >
                      {el}
                    </div>);
                })
              : ""}
          {/* </Form.Control> */}
        </div>
      );
    case "counter":
      return (
        <div key={_n} className={"counter-section-holder"}>
          <Row>
            <Col>
              <div
                className={"counter-el down"}
                onClick={(e: MouseEvent<HTMLElement>) => {
                  e.preventDefault();
                  if (changeTarget > 0) {
                    changeHandler((old: number) => old - 1);
                  }
                }}
              >
                -
              </div>
            </Col>
            <Col>
              <div
                className={"counter-el up"}
                onClick={(e: MouseEvent<HTMLElement>) => {
                  e.preventDefault();
                  changeHandler((old: number) => old + 1);
                }}
              >
                +
              </div>
            </Col>
          </Row>
        </div>
      );
    default:
      return "";
  }
};

export {};
