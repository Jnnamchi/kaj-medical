import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import Select from "react-select";
import { Formik, Form, Field } from "formik";
import { collection, doc, updateDoc, getDocs } from "firebase/firestore";

import { database } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";
import { userTypeOptions } from "../../utils/data";

const OnBoardPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const databaseRef = collection(database, "User Data");
  const [userData, setUserData] = useState<any>();

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("Full Name is required")
      .max(50, "Sorry, name is too long"),
  });

  const handleSubmit = async (values: any) => {
    if (userData) {
      updateDoc(doc(databaseRef, userData.docId), {
        user_name: values.fullName,
        user_type: values.entity,
      }).then(() => {
        router.push("/");
      });
    }
  };

  const getData = async () => {
    const userDB = await getDocs(databaseRef);
    const users: any = userDB.docs.map((doc) => ({
      ...doc.data(),
      docId: doc.id,
    }));
    const self = users.find((data: any) => data.email === user.email);
    if (self) {
      setUserData(self);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (userData && userData.user_type) {
      router.push("/");
    }
  }, [userData]);

  return (
    <div className="container h-full px-4 mx-auto ">
      <div className="flex flex-col items-center justify-center h-full">
        <Formik
          initialValues={{
            fullName: user && user.user_name ? user.user_name : "",
            entity: "",
          }}
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
                    options={userTypeOptions}
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
    </div>
  );
};

export default OnBoardPage;
