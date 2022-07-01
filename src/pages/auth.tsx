import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { database } from "../config/firebase";

export default function Auth() {
  const router = useRouter();
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const { login, signup, authWithGoogle, user } = useAuth();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const databaseRef = collection(database, "User Data");

  const handleChangeData = (e: any) =>
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });

  const handleSubmitLogin = async () => {
    try {
      if (showRegisterForm) {
        const res = await signup(loginData.email, loginData.password);
        if (res.user) {
          await addDoc(databaseRef, {
            id: res.user.uid,
            email: res.user.email,
          });
        }
      } else {
        const res = await login(loginData.email, loginData.password);
        if (res.user) {
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAuthWithGoogle = () => authWithGoogle();

  useEffect(() => {
    if (user) {
      router.push("/");
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
              <form>
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
                  <input
                    type="text"
                    className="block w-full px-4 py-2 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Email address"
                    name="email"
                    onChange={handleChangeData}
                  />
                </div>

                {/* <!-- Password input --> */}
                <div className="mb-6">
                  <input
                    type="password"
                    className="block w-full px-4 py-2 m-0 text-xl font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput2"
                    placeholder="Password"
                    name="password"
                    onChange={handleChangeData}
                  />
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
                    type="button"
                    className="inline-block py-3 text-sm font-medium leading-snug text-white uppercase transition duration-150 ease-in-out bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                    onClick={handleSubmitLogin}
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
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
