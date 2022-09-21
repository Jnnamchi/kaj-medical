import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth";

import Layout from "@/components/layout";
import { permissions } from "@/utils/data";
import { permissionSchema } from "@/containers/SurveyPage/schema";
import FormikControl from "@/components/surveyPage/SurveyFormikControl";

function InquiryPermissionCreate() {
  const authUser = useAuthUser();
  const router = useRouter();
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

  return (
    <div>
      <Layout>
        <div className="max-w-2xl p-4 mx-auto ">
          <Formik
            validationSchema={permissionSchema}
            initialValues={{
              description: "",
              videoUpload: "",
              catalogueUpload: "",
              workUs: ""
            }}
            onSubmit={handleSubmit}>
            {(formik) => (
              <Form>
                {Object.values(permissions).map((data, idx) => {
                  return (
                    <div>
                      <p className="font-bold ">
                        Reward {idx + 1}: {data.label}
                      </p>
                      <div className="py-8 space-y-4">
                        {data.fields.map((field, idx: number) => (
                          <FormikControl key={idx} {...field} formik={formik} />
                        ))}
                      </div>
                    </div>
                  );
                })}

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

InquiryPermissionCreate.requireAuth = true;

export default withAuthUser({
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(InquiryPermissionCreate);
