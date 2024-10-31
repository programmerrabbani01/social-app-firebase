import { User } from "firebase/auth";
import Layout from "../../Components/Layout/Layout.tsx";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FbPost from "../../Components/FbPost/FbPost.tsx";

interface HomeProps {
  user: User | null;
}

export default function Home({ user }: HomeProps) {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      toast.success(location.state.message);
    }
  }, [location.state]);
  return (
    <>
      <Layout user={user} />
      <div className="">
        <FbPost />
      </div>
    </>
  );
}
