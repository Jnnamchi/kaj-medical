import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import Select from "react-select";

const options = [
  { value: "broker", label: "Business Broker" },
  { value: "importer", label: "Licensed Distributor/Importer" },
  { value: "supplier", label: "Manufacturer (Supplier)" },
  { value: "brokerage", label: "Brokerage Agency" },
  { value: "government", label: "Government Agency" },
  { value: "profit", label: "Non Profit Organization" },
  { value: "facility", label: "Medical Facility" },
  { value: "collaborator", label: "Business Collaborator" },
  { value: "other", label: "Other" },
];

import * as Yup from "yup";

const OnBoardPage = () => {
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("Full Name is required")
      .max(50, "Sorry, name is too long"),
  });

  const handleSubmit = async (values: any) => {
    console.log(
      "🚀 ~ file: index.tsx ~ line 26 ~ handleSubmit ~ values",
      values
    );
    router.push("/");
  };
  return (
    <div className="container px-4 mx-auto">
      <section className="h-screen ">
        <div className="flex items-center justify-center h-full">
          <Formik
            initialValues={{ fullName: "", entity: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formik: any) => {
              return (
                <Form className="space-y-6 ">
                  <div>
                    <p className="mb-2">What is your Full Name ?</p>
                    <Field
                      type="text"
                      className="block w-full px-4 py-1 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="exampleFormControlInput2"
                      placeholder="Full Name"
                      name="fullName"
                    />
                    {formik.errors.fullName && formik.touched.fullName ? (
                      <span className="text-sm text-red-500">
                        {formik.errors.fullName}
                      </span>
                    ) : null}
                  </div>

                  <div>
                    <p className="mb-2">What type of entity are you ?</p>
                    <Select
                      options={options}
                      onChange={(selectedOption) =>
                        selectedOption &&
                        formik.setFieldValue("entity", selectedOption.value)
                      }
                    />
                  </div>

                  <div className="flex">
                    <button
                      type="submit"
                      className="w-2/3 px-4 py-2 m-auto mt-4 text-white bg-gray-500 rounded"
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </section>
    </div>
  );
};

export default OnBoardPage;
