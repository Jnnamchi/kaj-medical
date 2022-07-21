import * as Yup from "yup";
import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import TextError from "../../components/common/TextError";

export default function Test() {
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [currentStep, setCurrentStep] = useState(0);

  const makeRequest = (formData: any) => {
    console.log(
      "🚀 ~ file: test.tsx ~ line 17 ~ makeRequest ~ formData",
      formData
    );
  };

  const handleNextStep = (newData: any, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));
    if (final) {
      makeRequest(newData);
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = (newData: any) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    <StepOne next={handleNextStep} data={data} />,
    <StepTwo next={handleNextStep} prev={handlePrevStep} data={data} />,
  ];

  return (
    <div className="max-w-lg p-4 mx-auto space-y-4">{steps[currentStep]}</div>
  );
}

const stepOneValidationSchema = Yup.object({
  first_name: Yup.string().required().label("First Name"),
  last_name: Yup.string().required().label("Last Name"),
});

const steTwoValidationSchema = Yup.object({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().label("Password"),
});

const StepOne = (props: any) => {
  const handleSubmit = (values: any) => {
    props.next(values);
  };
  return (
    <Formik
      validationSchema={stepOneValidationSchema}
      initialValues={props.data}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="space-y-4 ">
          <p>First Name</p>
          <Field
            name="first_name"
            className="block w-full px-4 py-1 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
          <ErrorMessage component={TextError} name="first_name" />

          <p>Last Name</p>
          <Field
            name="last_name"
            className="block w-full px-4 py-1 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
          <ErrorMessage component={TextError} name="last_name" />

          <button
            type="submit"
            className="px-4 py-2 border border-gray-600 rounded"
          >
            Next
          </button>
        </Form>
      )}
    </Formik>
  );
};

const StepTwo = (props: any) => {
  const handleSubmit = (values: any) => {
    props.next(values, true);
  };
  return (
    <Formik
      validationSchema={steTwoValidationSchema}
      initialValues={props.data}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form className="space-y-4 ">
          <p>Email</p>
          <Field
            className="block w-full px-4 py-1 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            name="email"
          />
          <ErrorMessage component={TextError} name="email" />

          <p>Password</p>
          <Field
            className="block w-full px-4 py-1 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            name="password"
          />
          <ErrorMessage component={TextError} name="password" />

          <div className="flex justify-center space-x-4 ">
            <button
              className="px-4 py-2 border border-gray-600 rounded"
              type="button"
              onClick={() => props.prev(values)}
            >
              Back
            </button>
            <button
              className="px-4 py-2 border border-gray-600 rounded"
              type="submit"
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
