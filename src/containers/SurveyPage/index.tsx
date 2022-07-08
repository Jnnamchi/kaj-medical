import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { userTypeOptions } from "../../utils/data";
import FormikControl from "../../components/surveyPage/SurveyFormikControl";

const SurveyPage = () => {
  const [step, setStep] = useState(0);

  const fields = {
    inquiry: [
      {
        name: "firstName",
        label: "First Name",
        control: "input",
      },
      {
        name: "lastName",
        label: "Last Name",
        control: "input",
      },

      {
        name: "email",
        label: "Email (No gmail or major@mails) ",
        control: "input",
        type: "email",
      },

      {
        name: "companySite",
        label: "Company Website",
        control: "input",
      },

      {
        name: "companyEntity",
        label: "Company or Entity Name",
        control: "input",
      },

      {
        name: "location",
        label: "Location Registered",
        control: "select",
        options: userTypeOptions,
      },

      {
        name: "entityType",
        label: "Type of Entity",
        control: "select",
        options: userTypeOptions,
      },
      {
        name: "requestDescription",
        label: "Description of Request",
        control: "textarea",
      },
    ],
    document: {
      licensed: [
        {
          name: "companyRegistration",
          label: "Company Registration",
          control: "input",
          type: "file",
        },
        {
          name: "licenseRegistration",
          label: "License Registration documents / certifications",
          control: "input",
          type: "file",
        },
        {
          name: "governmentRegistration",
          label: "Government Registration Forms",
          control: "input",
          type: "file",
        },
      ],
      manufacturer: [
        {
          name: "productCatalogue",
          label: "Product Catalogue",
          control: "input",
          type: "file",
        },
        {
          name: "certification",
          label: "Certification(s)",
          control: "input",
          type: "file",
        },
      ],
      brokerageAgency: [
        {
          name: "companyRegistration",
          label: "Company Registration",
          control: "input",
          type: "file",
        },
        {
          name: "registrationCertifications",
          label: "Registration Certifications",
          control: "input",
          type: "file",
        },
        {
          name: "VATnumberCode",
          label: "Company VAT number / code",
          control: "input",
          type: "file",
        },
      ],
      medicalFacility: [
        {
          name: "companyRegistration",
          label: "Company Registration",
          control: "input",
          type: "file",
        },
      ],
    },
    ekyc: [
      {
        name: "firstName",
        label: "First Name",
        control: "input",
      },
      {
        name: "lastName",
        label: "Last Name",
        control: "input",
      },
      {
        name: "birth",
        label: "Date of Birth",
        control: "input",
        type: "date",
      },

      {
        name: "governmentId",
        label: "Unique ID Number (Government ID or Passport Number)",
        control: "input",
      },

      {
        name: "passport",
        label: "Passport or ID Copy",
        control: "input",
      },
    ],
  };

  type ObjectKey = keyof typeof fields.document;

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
          if (step !== 2) {
            setStep(step + 1);
          }
        }}
      >
        {(formik) => {
          return (
            <Form>
              <div className="p-6 py-8 space-y-8">
                {step === 0 && (
                  <SurveyPart fields={fields.inquiry} formik={formik} />
                )}
                {step === 1 && (
                  <SurveyPart
                    fields={
                      fields.document[formik.values.entityType as ObjectKey]
                    }
                    formik={formik}
                  />
                )}
                {step === 2 && <SurveyPart fields={fields.ekyc} />}

                <div className="flex">
                  <button
                    type="submit"
                    className="px-4 py-2 m-auto border border-gray-600 rounded"
                  >
                    {step === 2 ? "Finish" : "Continue"}
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
