import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { documentSchema, inquirySchema } from "./schema";
import { documentInitValues, surveyFields } from "../../utils/data";
import FormikControl from "../../components/surveyPage/SurveyFormikControl";
import { DocumentStepInterface, InquiryStepInterface } from "./interface";

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
  type ObjectKey = keyof typeof documentInitValues;

  useEffect(() => {
    if (documentInitValues[formData.entityType as ObjectKey]) {
      setFormData((prev) => ({
        ...prev,
        ...documentInitValues[formData.entityType as ObjectKey],
      }));
    }
  }, [formData.entityType]);

  const makeRequest = (formData: any) => {
    console.log(" ~ formData", formData);
  };

  const handleNextStep = (newData: any, final = false) => {
    setFormData((prev) => ({ ...prev, ...newData }));
    if (final) {
      makeRequest(newData);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = (newData: any) => {
    setFormData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const surveySteps = [
    <InquiryStep next={handleNextStep} data={formData} />,
    <DocumentStep
      next={handleNextStep}
      prev={handlePrevStep}
      data={formData}
    />,
    // <EkycStep />
  ];

  return (
    <div className="max-w-2xl p-4 mx-auto ">
      <p className="text-xl text-center">
        {currentStep === 0
          ? "Step 1: Inquiry form"
          : currentStep === 1
          ? "Step 2: Company Verification"
          : "Step 3: eKYC"}
      </p>
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
    console.log(
      "🚀 ~ file: index.tsx ~ line 129 ~ handleSubmit ~ values",
      values
    );
    props.next(values);
  };

  return (
    <Formik
      validationSchema={inquirySchema}
      initialValues={props.data}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form>
          <div className="py-8 space-y-4">
            <SurveyPart fields={surveyFields.inquiry} formik={formik} />
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-4 py-2 border border-gray-600 rounded"
              >
                Continue
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const DocumentStep = (props: DocumentStepInterface) => {
  const handleSubmit = (values: any) => {
    props.next(values);
  };
  type ObjectKey = keyof typeof surveyFields.document;
  console.log(
    "🚀 ~ file: index.tsx ~ line 189 ~ DocumentStep ~ props.data",
    props.data
  );
  const schema = documentSchema[props.data.entityType as ObjectKey];
  console.log(
    "🚀 ~ file: index.tsx ~ line 190 ~ DocumentStep ~ schema",
    schema
  );

  return (
    <Formik
      validationSchema={schema}
      initialValues={props.data}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {(formik) => (
        <Form>
          <div className="py-8 space-y-4">
            <SurveyPart
              fields={
                surveyFields.document[formik.values.entityType as ObjectKey]
              }
              formik={formik}
            />

            <div className="flex justify-center space-x-4">
              <button
                className="px-4 py-2 border border-gray-600 rounded"
                type="button"
                onClick={() => props.prev(formik.values)}
              >
                Back
              </button>

              <button
                type="submit"
                className="px-4 py-2 border border-gray-600 rounded"
              >
                Continue
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SurveyPage;
