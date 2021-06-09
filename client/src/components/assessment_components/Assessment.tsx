import { useState } from "react";
import InitialAssessmentSection from "./assessment_components/InitialAssessmentSection";
import DeepAssessmentSection from "./assessment_components/DeepAssessmentSection";

const Assessment = () => {
  const [sessionInitiated, setSessionInitiated] = useState<boolean>(false)
  return (
    <>
      {sessionInitiated ?
      <DeepAssessmentSection /> :
      <InitialAssessmentSection
        setSessionInitiated={setSessionInitiated}
      />
    }
      
    </>
  );
};

export default Assessment;
