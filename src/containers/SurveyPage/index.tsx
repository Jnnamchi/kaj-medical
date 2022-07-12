import { useState } from "react";
import { Form, Formik } from "formik";
import { inquirySchema } from "./schema";
import { surveyFields } from "../../utils/data";
import { InquiryStepInterface } from "./interface";
import FormikControl from "../../components/surveyPage/SurveyFormikControl";

const SurveyPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companySite: "",
    companyEntity: "",
    location: "",
    entityType: "",
    requestDescription: "",
  });

  type ObjectKey = keyof typeof surveyFields.document;

  const makeRequest = (formData: any) => {};

  const handleNextStep = (newData: any, final = false) => {
    setFormData((prev) => ({ ...prev, ...newData }));
    if (final) {
      makeRequest(newData);
      return;
    }
  };

  const surveySteps = [
    <InquiryStep next={handleNextStep} data={formData} />,
    //  <DocumentStep />, <EkycStep />
  ];

  return (
    <div className="max-w-2xl p-4 mx-auto ">
      {surveySteps[currentStep]}
      {/* <p className="text-xl text-center">
        {step === 0
          ? "Step 1: Inquiry form"
          : step === 1
          ? "Step 2: Company Verification"
          : "Step 3: eKYC"}
      </p>
      <Formik
        initialValues={{}}
        validationSchema={inquirySchema}
        onSubmit={() => {
          if (step === 3) {
            router.push("/");
          } else {
            setStep(step + 1);
          }
        }}
      >
        {(formik) => {
          return (
            <Form>
              <div className="p-6 py-8 space-y-8">
                {step === 0 && (
                  <SurveyPart fields={surveyFields.inquiry} formik={formik} />
                )}
                {step === 1 && (
                  <SurveyPart
                    fields={
                      surveyFields.document[
                        formik.values.entityType as ObjectKey
                      ]
                    }
                    formik={formik}
                  />
                )}
                {step === 2 && <SurveyPart fields={surveyFields.ekyc} />}
                {step === 3 && <div>You are all set !</div>}

                <div className="flex justify-center space-x-4">
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="px-4 py-2 border border-gray-600 rounded"
                    >
                      Go Back
                    </button>
                  )}

                  <button
                    type="submit"
                    className="px-4 py-2 border border-gray-600 rounded"
                  >
                    {step === 0 || step === 1
                      ? "Continue"
                      : step === 2
                      ? "Finish"
                      : "Go To Home Page"}
                  </button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik> */}
    </div>
  );
};

const SurveyPart = ({ fields, formik }: any) => {
  if (fields) {
    return fields.map((field: any, id: number) => {
      return <FormikControl {...field} formik={formik} key={id} />;
    });
  }
};

const InquiryStep = (props: InquiryStepInterface) => {
  const handleSubmit = (values: any) => {
    props.next(values);
  };

  return (
    <Formik
      validationSchema={inquirySchema}
      initialValues={props.data}
      onSubmit={handleSubmit}
    >
      {(formik) => <SurveyPart fields={surveyFields.inquiry} formik={formik} />}
    </Formik>
  );
};

export default SurveyPage;
