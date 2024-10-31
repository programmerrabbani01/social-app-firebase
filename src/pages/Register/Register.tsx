import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { uploadFileToStorage } from "../../firebase/fileData.ts";
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/auth.ts";
import { createAUser } from "../../firebase/model.ts";
import { FieldValue, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

interface InputState {
  name: string;
  userName: string;
  email: string;
  password: string;
}

interface FireStoreUser {
  id: string;
  name: string | null;
  userName: string;
  photo: string | null | undefined;
  email: string | null;
  friends: string[];
  followers: string[];
  createdAt: FieldValue;
  updatedAt: FieldValue | null;
  status: boolean;
  trash: boolean;
}

export default function Register() {
  const navigate = useNavigate();

  const [input, setInput] = useState<InputState>({
    name: "",
    userName: "",
    email: "",
    password: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);

  //   input value changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //   submit form
  const handleUserRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsRegistering(true);

    const photoLink = file ? await uploadFileToStorage(file) : undefined;

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        input.email,
        input.password
      );

      await updateProfile(res.user, {
        displayName: input.name,
        photoURL: photoLink,
      });

      const firestoreUser: FireStoreUser = {
        id: res.user.uid,
        name: res.user.displayName ?? null,
        userName: input.userName,
        photo: res.user.photoURL ?? null,
        email: res.user.email ?? null,
        friends: [],
        followers: [],
        createdAt: serverTimestamp(),
        updatedAt: null,
        status: true,
        trash: false,
      };

      await createAUser("users", firestoreUser, res.user.uid);
      // Show toast notification for successful registration
      toast.success("Registration successful!");

      // Explicitly navigate to the login page without waiting for onAuthStateChanged
      await signOut(auth);
      setIsRegistering(false);
      navigate("/login");

      // await signOut(auth);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message); // Ensures error is of type Error before accessing `message`
      } else {
        console.log("An unknown error occurred.");
      }
      setIsRegistering(false);
    }

    // reset form
    setInput({
      name: "",
      userName: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
          <form
            className="w-full max-w-md pt-5 pb-10"
            onSubmit={handleUserRegister}
          >
            <div className="flex justify-center mx-auto">
              <img
                className="w-48 h-40"
                src="/public/social-media.png"
                alt=""
              />
            </div>
            <div className="flex items-center justify-center mt-6">
              <span className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white">
                sign up
              </span>
            </div>
            <div className="relative flex items-center mt-8">
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <input
                type="text"
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Enter Your Full Name"
                name="name"
                value={input.name}
                onChange={handleInputChange}
              />
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <input
                type="text"
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Enter Your Username"
                name="userName"
                value={input.userName}
                onChange={handleInputChange}
              />
            </div>
            <label
              htmlFor="dropzone-file"
              className="flex items-center px-3 py-3 mx-auto mt-6 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              <h2 className="mx-3 text-gray-400">Profile Photo</h2>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
            </label>
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
                {isRegistering ? "Registering..." : "Sign Up"}
              </button>
              {/* or sign up with social media */}
              <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5" />
                <span className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 ">
                  or Register with Social Media
                </span>
                <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5" />
              </div>

              {/* already Have A Account */}
              <div className="mt-6 text-center ">
                <Link
                  to={"/login"}
                  className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                >
                  Already have an account?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
