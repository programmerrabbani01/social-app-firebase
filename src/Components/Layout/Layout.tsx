import { useState } from "react";

export default function Layout({ user }) {
  console.log(user);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
              <span className="font-medium text-gray-700">Username</span>
              <img
                src="/profile-icon.png" // replace with the path to your icon image
                alt="User Icon"
                onClick={toggleDropdown}
                className="w-10 h-10 rounded-full cursor-pointer"
              />

              {isDropdownOpen && (
                <div className="absolute w-48 mt-2 bg-[#E5E7EB] rounded-md shadow-lg right-5 top-12">
                  <ul className="py-1">
                    <li className="px-4 py-2 cursor-pointer hover:bg-white">
                      Profile
                    </li>
                    <li className="px-4 py-2 cursor-pointer hover:bg-white">
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
