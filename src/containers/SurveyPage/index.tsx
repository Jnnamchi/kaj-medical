import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { surveyFields } from "../../utils/data";
import FormikControl from "../../components/surveyPage/SurveyFormikControl";
import { useRouter } from "next/router";

const SurveyPage = () => {
  const [step, setStep] = useState(0);

  type ObjectKey = keyof typeof surveyFields.document;

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name Required"),
    lastName: Yup.string().required("Last Name Required"),
    email: Yup.string().email("Invalid email").required("Email Required"),
    companySite: Yup.string().required("Company Website Required"),
    companyEntity: Yup.string().required("Company or Entity Name Required"),
    location: Yup.string().required("Location Required"),
    entityType: Yup.string().required("Type of Entity Required"),
    requestDescription: Yup.string().required(
      "Description of Request Required"
    ),
    // birth: Yup.string().required("Date of Birth Required"),
  });
  const router = useRouter();
  return (
    <div className="max-w-2xl mx-auto ">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          companySite: "",
          companyEntity: "",
          location: "",
          entityType: "",
          requestDescription: "",
        }}
        validationSchema={validationSchema}
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

                <div className="flex">
                  <button
                    type="submit"
                    className="px-4 py-2 m-auto border border-gray-600 rounded"
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
      </Formik>
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

export default SurveyPage;
