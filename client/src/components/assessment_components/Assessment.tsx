import { useState } from "react";
import InitialAssessmentSection from "./assessment_components/InitialAssessmentSection";
import DeepAssessmentSection from "./assessment_components/DeepAssessmentSection";
import BackButton from "../../utils/BackButton";

const Assessment = () => {
  const [sessionInitiated, setSessionInitiated] = useState<boolean>(false);
  return (
    <>
      <BackButton prev="" />
      {sessionInitiated ? (
        <DeepAssessmentSection />
      ) : (
        <InitialAssessmentSection setSessionInitiated={setSessionInitiated} />
      )}
    </>
  );
};

export default Assessment;
