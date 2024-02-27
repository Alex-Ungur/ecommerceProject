import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { login } from "../firebase/auth";
// import useUserStore from "../stores/useUserStore";

const Login = () => {
  const { userLoggedIn, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    errorMessage: null,
    errorCode: null,
  });

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/");
    }
  }, [userLoggedIn]);

  if (loading) {
    return <p>Chargement..</p>;
  }

  // const initializeUser = useUserStore((state) => state.initializeUser);

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoader(true);
    // setLoader(true);
    // signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     // navigate("/");
    //     setErrorMessage({
    //       errorMessage: null,
    //       errorCode: null,
    //     });
    //     // console.log(user);
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMsg = error.message;
    //     // console.log("error", error);
    //     setErrorMessage({ errorMessage: errorMsg, errorCode: errorCode });
    //     // console.log(`errorCode : ${errorCode}, errorMessage : ${errorMsg}`);
    //   })
    //   .finally(() => {
    //     setLoader(false);
    //     console.log(errorMessage);
    //     if (errorMessage.errorMessage || errorMessage.errorCode) {
    //       // navigate("/");
    //     }
    //   });

    try {
      await login(email, password);
      setErrorMessage({
        errorMessage: null,
        errorCode: null,
      });
      setLoader(false);
      navigate("/");
    } catch (err) {
      console.log(err);
      setLoader(false);
      /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
      /* @ts-ignore  */
      const errorCode = err.code;
      /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
      /* @ts-ignore  */
      const errorMsg = err.message;
      // console.log("err", errorCode, "rrer", errorMessage);
      //     // console.log("error", error);
      setErrorMessage({ errorMessage: errorMsg, errorCode: errorCode });
    }
    // finally {
    //   navigate("/");
    // }
  };
  //todo : ajouter toast pour les erreurs

  return (
    <>
      <section className="bg-gray-900 h-full min-h-[100vh]">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              {(errorMessage?.errorCode || errorMessage?.errorMessage) && (
                <h2 className="text-red-500">{errorMessage.errorMessage}</h2>
              )}

              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-white">
                Connexion
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="test@test.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                    className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                {/* <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div> */}
                <button
                  type="submit"
                  onClick={onLogin}
                  className={`w-full text-white bg-blue-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-blue-700 focus:ring-primary-800 ${
                    (loader || email === "" || password === "") &&
                    "disabled:opacity-50 disabled:pointer-events-none cursor-not-allowed"
                  }`}
                  disabled={loader || email === "" || password === ""}
                >
                  {loader ? "Chargement..." : "Connexion"}
                </button>
                {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </a>
                </p> */}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
