import { useState } from "react";
import { documentPerEntity } from "../../utils/data";
import DocumentPart from "./document";
import EkycPart from "./ekyc";
import InquiryPart from "./inquiry";

const SurveyPage = () => {
  const [step, setStep] = useState(0);
  const documentFields = documentPerEntity["brokerageAgency"];

  const handleClick = () => {
    if (step !== 2) {
      setStep(step + 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto ">
      <div className="p-6 py-8 space-y-8">
        {step === 0 && <InquiryPart />}
        {step === 1 && <DocumentPart formFields={documentFields} />}
        {step === 2 && <EkycPart />}

        <div className="flex">
          <button
            onClick={handleClick}
            className="px-4 py-2 m-auto border border-gray-600 rounded"
          >
            {step === 2 ? "Finish" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;
