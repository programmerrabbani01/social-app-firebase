import { signOut, User } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase/auth.ts";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

interface LayoutProps {
  user: User | null;
}

export default function Layout({ user }: LayoutProps) {
  console.log(user);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // log out

  const handleUserLogOut = async () => {
    console.log("Logging out..."); // Debugging statement
    try {
      await toast.promise(signOut(auth), {
        pending: "Logging out...",
        success: "Logout successful!",
        error: "Failed to logout. Please try again.",
      });
      // Delay navigation to allow time for the toast to display
      setTimeout(() => {
        navigate("/login");
      }, 2000); // 2 seconds delay
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <div className="bg-white w-full flex xl:items-center xl:gap-[15px] items-center justify-between transition-all duration-300 py-2 shadow-md">
        <div className="my_container">
          {/* menu */}
          <div className="flex items-center justify-between">
            {/* logo */}
            <div className="">
              <img
                src="/social-media.png"
                alt="social-media"
                className=" w-[200px] h-[60px] object-contain"
              />
            </div>
            {/* menu */}
            <div className=""></div>
            {/* icon */}
            <div className="relative flex items-center space-x-2">
              <span className="font-medium text-gray-700">
                {user?.displayName || "Username"}
              </span>
              <img
                src={user?.photoURL || "/profile-icon.png"}
                // replace with the path to your icon image
                alt="User Icon"
                onClick={toggleDropdown}
                className="w-10 h-10 rounded-full cursor-pointer"
              />

              {isDropdownOpen && (
                <div className="absolute w-48 mt-2 bg-[#E5E7EB] rounded-md shadow-lg right-5 top-12">
                  <ul className="py-1">
                    <li className="px-4 py-2 cursor-pointer hover:bg-white">
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li
                      onClick={handleUserLogOut}
                      className="px-4 py-2 cursor-pointer hover:bg-white"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
