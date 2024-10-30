import {
  FacebookAuthProvider,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import { fireBaseApp } from "./app.ts";

// export Initialize Auth
export const auth = getAuth(fireBaseApp);

// social media login providers

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const githubProvider = new GithubAuthProvider();
