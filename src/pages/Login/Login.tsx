import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  facebookProvider,
  githubProvider,
  googleProvider,
} from "../../firebase/auth.ts";

export default function Login() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  //   input value changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //   submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, input.email, input.password);

      // Redirect to /home after successful sign-in
      navigate("/", { state: { message: "Login successful!" } });

      // reset form
      setInput({
        email: "",
        password: "",
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message); // Ensures error is of type Error before accessing `message`
      } else {
        console.log("An unknown error occurred.");
      }
    }
  };

  // social register and login

  // google register and login

  const handleGoogleRegistration = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  // facebook register and login
  const handleFaceBookLogIn = async () => {
    await signInWithPopup(auth, facebookProvider);
  };

  // github register and login
  const handleGitHubLogIn = async () => {
    await signInWithPopup(auth, githubProvider);
  };
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
          <form className="w-full max-w-md pt-5 pb-10" onSubmit={handleSubmit}>
            <div className="flex justify-center mx-auto">
              <img
                className="w-48 h-40"
                src="/public/social-media.png"
                alt=""
              />
            </div>
            <div className="flex items-center justify-center mt-6">
              <span className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white">
                sign in
              </span>
            </div>

            <div className="relative flex items-center mt-6">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <input
                type="email"
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Enter Your Email address"
                name="email"
                value={input.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="relative flex items-center mt-4">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>
              <input
                type="password"
                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Enter Your Password"
                name="password"
                value={input.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                Sign In
              </button>
              {/* or sign in with social media */}
              <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5" />
                <span className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 ">
                  or Login with Social Media
                </span>
                <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5" />
              </div>

              {/* Social Media Login */}
              <div className="flex items-center justify-center mt-4">
                <div className="flex flex-col w-full max-w-xs gap-y-5">
                  <button
                    onClick={handleGoogleRegistration}
                    className="bg-white flex items-center text-gray-700 dark:text-gray-300 justify-center gap-x-3 text-sm sm:text-base  dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 rounded-lg hover:bg-gray-100 duration-300 transition-colors border px-8 py-2.5"
                  >
                    <svg
                      className="w-5 h-5 sm:h-6 sm:w-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_3033_94454)">
                        <path
                          d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3276 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.50253 14.3003C4.99987 12.8099 4.99987 11.1961 5.50253 9.70575V6.61481H1.51649C-0.18551 10.0056 -0.18551 14.0004 1.51649 17.3912L5.50253 14.3003Z"
                          fill="#FBBC04"
                        />
                        <path
                          d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.2401 4.74966Z"
                          fill="#EA4335"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3033_94454">
                          <rect width={24} height={24} fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span>Sign in with Google</span>
                  </button>
                  <button
                    onClick={handleFaceBookLogIn}
                    className="bg-[#1877F2] flex gap-x-3 text-sm sm:text-base items-center justify-center text-white rounded-lg hover:bg-[#1877F2]/80 duration-300 transition-colors border border-transparent px-8 py-2.5"
                  >
                    <svg
                      className="w-5 h-5 sm:h-6 sm:w-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_3033_94669)">
                        <path
                          d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_3033_94669">
                          <rect width={24} height={24} fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span>Sign in with Facebook</span>
                  </button>
                  <button
                    onClick={handleGitHubLogIn}
                    className="bg-black rounded-lg text-sm sm:text-base flex items-center gap-x-3 justify-center text-white hover:bg-black/80 duration-300 transition-colors border border-transparent px-8 py-2.5"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      viewBox="0 0 2000 2000"
                      className="w-5 h-5 sm:h-8 sm:w-8"
                    >
                      <path
                        transform="translate(484,417)"
                        d="m0 0h29l27 4 36 9 22 8 27 11 35 17 28 15 13 8 16 10 20 13 10 6h10l56-14 26-5 37-6 35-4 30-2 42-2h29l58 3 44 4 47 7 39 8 43 11 8 1 16-10 15-10 21-13 19-11 33-17 28-13 28-11 15-5 28-7 23-4 10-1h31l5 5 7 16 8 26 8 33 4 25 2 29v43l-2 27-5 26-6 20-3 8v6l11 14 12 15 18 27 9 15 12 23 13 32 9 28 6 25 5 31 3 39v57l-3 42-5 39-7 38-8 32-12 36-10 25-12 25-16 27-12 17-18 22-12 13-17 17-11 9-18 14-27 18-22 12-22 11-26 11-25 9-28 9-38 9-27 6-54 9-25 3 7 8 3 3v2l4 2 7 8 11 15 10 18 7 15 9 27 5 24 4 30 2 38v30l-1 58-1 186 1 13 3 9 7 9 10 7 14 5 39 5 11 3 9 7 7 11 4 10 3 14v3h-710l5-21 6-12 6-7 10-6 14-4 32-3 16-6 9-7h2l8-16 1-7v-46l-1-76-1-34v-26l-30 5-51 6-13 1h-23l-34-3-8-2-18-2-29-9-27-12-19-11-19-14-10-9-8-7-10-11-13-17-8-13-9-17-15-34-12-26-14-24-10-15-10-13-12-14-19-19-20-15-14-8-16-12-11-11-4-8-1-5 2-7 7-6 12-4 13-2h14l24 4 24 8 25 12 18 12 10 8 10 9 13 12 9 10 13 17 11 17 7 11 14 19 13 15 10 10 11 9 17 12 23 12 16 6 24 6 34 3 26-2 19-2 19-4 25-7 25-8 3-6 3-21 7-26 6-16 9-19 12-20 12-16 9-10 2-5-18-3-33-5-9-2-23-3-44-10-11-3-12-3-33-11-30-12-23-11-22-12-19-12-19-14-14-11-15-13-16-16-9-11-13-16-20-30-12-22-13-27-9-24-10-32-6-24-8-41-4-28-3-27-1-20v-85l1-19 5-29 6-25 7-24 9-24 9-20 12-23 13-20 13-19 22-28 1-4-6-17-5-20-4-23-3-30v-32l3-32 6-32 9-35 6-20 5-12 6-7z"
                        fill="#FEFEFE"
                      />
                    </svg>
                    <span>Sign in with GitHub</span>
                  </button>
                </div>
              </div>
              {/* Don't Have An Account */}
              <div className="mt-6 text-center ">
                <Link
                  to={"/register"}
                  className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                >
                  Don’t have an account yet? Sign up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
