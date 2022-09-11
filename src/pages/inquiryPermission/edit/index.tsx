import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth";

import { permissionFields } from "@/utils/data";
import Layout from "@/components/layout";
import { permissionSchema } from "@/containers/SurveyPage/schema";
import FormikControl from "@/components/surveyPage/SurveyFormikControl";
import { useEffect, useState } from "react";

function InquiryPermissionEdit() {
  const authUser = useAuthUser();
  const router = useRouter();

  const [initValues, setInitValues] = useState({
    companyName: ""
  });

  const handleSubmit = async (values: any) => {
    const token = await authUser.getIdToken();

    const response = await fetch("/api/user", {
      method: "PUT",
      headers: {
        Authorization: token || "unauthenticated"
      },
      body: JSON.stringify({
        acceptingInquiries: true,
        inquiryMetadata: {
          companyName: values.companyName,
          companyInquiryCode: Math.random()
        }
      })
    });
    if (response.ok) {
      router.push("/");
    }
  };

  const getUserData = async () => {
    const token = await authUser.getIdToken();
    if (!token) {
      return;
    }

    const response = await fetch("/api/user", {
      method: "GET",
      headers: {
        Authorization: token
      }
    });
    return response.json();
  };

  useEffect(() => {
    getUserData().then((res) => {
      if (res?.self) {
        setInitValues(res?.self?.inquiryMetadata);
      }
    });
  }, [authUser]);

  return (
    <div>
      <Layout>
        <div className="max-w-2xl p-4 mx-auto ">
          <Formik
            enableReinitialize
            validationSchema={permissionSchema}
            initialValues={initValues}
            onSubmit={handleSubmit}>
            {(formik) => (
              <Form>
                <div className="py-8 space-y-4">
                  {permissionFields.inquiry.map((field, idx: number) => (
                    <FormikControl key={idx} {...field} formik={formik} />
                  ))}
                </div>
                <div className="flex justify-center space-x-4">
                  <button type="submit" className="px-4 py-2 border border-gray-600 rounded">
                    Complete
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Layout>
    </div>
  );
}

InquiryPermissionEdit.requireAuth = true;

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(InquiryPermissionEdit);
