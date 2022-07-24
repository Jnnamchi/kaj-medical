import * as Yup from "yup";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth";

import { useAuth } from "../../context/AuthContext";
import { userTypeOptions } from "../../utils/data";
import Select from "../../components/common/Select";
import Input from "../../components/common/Input";

const OnBoardPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const authUser = useAuthUser();

  const saveOnboardData = async (payload: { fullName: string; entity: string }) => {
    const token = await authUser.getIdToken();
    if (authUser.clientInitialized) {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          Authorization: token || "unauthenticated"
        },
        body: JSON.stringify({
          user_name: payload.fullName,
          user_type: payload.entity,
          email: authUser.email,
          id: authUser.id
        })
      });
      const data = await response.json();
      if (!response.ok) {
        console.error(
          `Data fetching failed with status ${response.status}: ${JSON.stringify(
            data
          )}`
        );
        return null;
      }
      return data;
    }

    const response = await fetch("/api/user", {
      method: "PUT",
      headers: {
        Authorization: token || "unauthenticated"
      },
      body: JSON.stringify({
        user_name: payload.fullName,
        user_type: payload.entity
      })
    });
    const data = await response.json();
    if (!response.ok) {
      console.error(
        `Data fetching failed with status ${response.status}: ${JSON.stringify(
          data
        )}`
      );
      return null;
    }
    return data;
  };

  const handleSubmit = async (values: any) => {
    saveOnboardData(values).then(() => router.push("/"));
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("Full Name is required")
      .max(50, "Sorry, name is too long"),
    entity: Yup.string().required("Entity Type is required")
  });

  return (
    <div className="container h-full px-4 mx-auto ">
      <div className="flex flex-col items-center justify-center h-full">
        <Formik
          initialValues={{
            fullName: user && user.user_name ? user.user_name : "",
            entity: ""
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik: any) => {
            return (
              <Form className="space-y-6 ">
                <div>
                  <p className="mb-2">What is your Full Name ?</p>
                  <Input
                    formik={formik}
                    name="fullName"
                    placeholder="Full Name"
                    type="text"
                  />
                </div>

                <div>
                  <p className="mb-2">What type of entity are you ?</p>
                  <Select formik={formik} name="entity" options={userTypeOptions} />
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
export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(OnBoardPage);
