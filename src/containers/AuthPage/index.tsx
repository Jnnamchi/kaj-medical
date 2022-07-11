import * as Yup from "yup";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { database } from "../../config/firebase";

const AuthPage = () => {
  const router = useRouter();
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const { login, signup, authWithGoogle, user } = useAuth();

  const databaseRef = collection(database, "User Data");

  const getData = async () => {
    const userDB = await getDocs(databaseRef);
    const users: any = userDB.docs.map((doc) => ({
      ...doc.data(),
      docId: doc.id,
    }));
    const self = users.find((data: any) => data.email === user.email);
    return self;
  };

  const addUserDataToFireStore = async (user: {
    uid: string;
    email: string;
    user_name?: string;
  }) => {
    await addDoc(databaseRef, {
      id: user.uid,
      email: user.email,
      user_name: user.user_name || "",
    });
  };

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      if (showRegisterForm) {
        const res = await signup(values.email, values.password);
        if (res.user) {
          await addUserDataToFireStore(res.user);
          router.push("/onboard");
        }
      } else {
        await login(values.email, values.password);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAuthWithGoogle = () => {
    authWithGoogle();
  };

  useEffect(() => {
    if (user) {
      getData().then(async (res) => {
        if (res) {
          router.push("/");
        } else {
          await addUserDataToFireStore(user);
          router.push("/onboard");
        }
      });
    }
  }, [user]);

  return (
    <div className="container px-4 mx-auto">
      <section className="h-screen ">
        <div className="h-full px-6 text-gray-800">
          <div className="flex flex-wrap items-center justify-center h-full xl:justify-center lg:justify-between g-6">
            <div className="mb-12 grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt="Sample image"
              />
            </div>
            <div className="mb-12 xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 md:mb-0">
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email("Invalid email")
                    .required("Email Required"),
                  password: Yup.string().required("Password Required"),
                })}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="flex flex-row items-center justify-center lg:justify-start">
                      <p className="mb-0 mr-4 text-lg">
                        {showRegisterForm ? "Register" : "Sign in"} with
                      </p>
                      <button
                        onClick={handleAuthWithGoogle}
                        type="button"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="light"
                        className="inline-block p-3 mx-1 text-xs font-medium leading-tight text-white uppercase transition duration-150 ease-in-out bg-blue-600 rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          role="img"
                          width="1em"
                          height="1em"
                          preserveAspectRatio="xMidYMid meet"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M21.456 10.154c.123.659.19 1.348.19 2.067c0 5.624-3.764 9.623-9.449 9.623A9.841 9.841 0 0 1 2.353 12a9.841 9.841 0 0 1 9.844-9.844c2.658 0 4.879.978 6.583 2.566l-2.775 2.775V7.49c-1.033-.984-2.344-1.489-3.808-1.489c-3.248 0-5.888 2.744-5.888 5.993c0 3.248 2.64 5.998 5.888 5.998c2.947 0 4.953-1.685 5.365-3.999h-5.365v-3.839h9.26Z"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                      <p className="mx-4 mb-0 font-semibold text-center">Or</p>
                    </div>

                    {/* <!-- Email input --> */}
                    <div className="mb-6">
                      <Field
                        type="text"
                        className="block w-full px-4 py-2 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded  bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="exampleFormControlInput2"
                        placeholder="Email address"
                        name="email"
                      />
                      {errors.email && touched.email ? (
                        <span className="text-sm text-red-500">
                          {errors.email}
                        </span>
                      ) : null}
                    </div>

                    {/* <!-- Password input --> */}
                    <div className="mb-6">
                      <Field
                        type="password"
                        className="block w-full px-4 py-2 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded  bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="exampleFormControlInput2"
                        placeholder="Password"
                        name="password"
                      />
                      {errors.password && touched.password ? (
                        <span className="text-sm text-red-500">
                          {errors.password}
                        </span>
                      ) : null}
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <div className="form-group form-check">
                        <input
                          type="checkbox"
                          className="float-left w-4 h-4 mt-1 mr-2 align-top transition duration-200 bg-white bg-center bg-no-repeat bg-contain border border-gray-300 rounded-sm appearance-none cursor-pointer form-check-input checked:bg-blue-600 checked:border-blue-600 focus:outline-none"
                          id="exampleCheck2"
                        />
                        <label className="inline-block text-gray-800 form-check-label">
                          Remember me
                        </label>
                      </div>
                      <a href="#!" className="text-gray-800">
                        Forgot password?
                      </a>
                    </div>

                    <div className="text-center lg:text-left">
                      <button
                        type="submit"
                        className="inline-block py-3 text-sm font-medium leading-snug text-white uppercase transition duration-150 ease-in-out bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                      >
                        {showRegisterForm ? "Register" : "Login"}
                      </button>
                      <p
                        className="pt-1 mt-2 mb-0 text-sm font-semibold"
                        onClick={() => setShowRegisterForm(!showRegisterForm)}
                      >
                        <span>
                          {showRegisterForm
                            ? "Already have an account?"
                            : `Don't have an account?`}
                        </span>
                        <span className="ml-2 text-red-600 transition duration-200 ease-in-out cursor-pointer hover:text-red-700 focus:text-red-700">
                          {showRegisterForm ? "Login" : "Register"}
                        </span>
                      </p>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AuthPage;
