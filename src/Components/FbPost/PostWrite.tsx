import { useState } from "react";
import myImage from "../../../public/my.jpg";
import live from "../../../public/live.png";
import photoVideo from "../../../public/photoVideo.png";
import reel from "../../../public/reel.png";
import PostPopUp from "./PostPopUp";

export default function PostWrite() {
  const [isOpen, setIsOpen] = useState(false);

  // Toggles the modal
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="max-w-lg mx-auto mt-8 mb-4">
        <div className="w-full overflow-x-hidden overflow-y-hidden bg-white rounded-lg shadow-md">
          <div className="pt-3 pr-4 pb-[10px] pl-4">
            {/* top item */}
            <div className="flex items-center p-2 space-x-3">
              {/* image */}

              <img
                src={myImage}
                alt="Profile"
                className="object-cover w-10 h-10 rounded-full"
              />
              {/* write post */}
              <div
                className="bg-[#E4E6E9] rounded-full px-4 py-2 w-full focus:outline-none cursor-pointer"
                onClick={toggleModal}
              >
                <span className="text-[rgb(101,103,107)]">
                  What's on your mind, Programmer?
                </span>
              </div>
            </div>
            {/* bottom item */}
            <div className="mt-1">
              {/* border */}
              <div className="border border-gray-200"></div>
              {/* content */}
              <div className="flex items-center justify-around w-full h-10 pt-2">
                <button className="flex items-center p-2 space-x-2 text-gray-600 rounded-lg hover:bg-gray-100">
                  <img src={live} alt="live" width={24} height={24} />
                  <span>Live video</span>
                </button>
                <button className="flex items-center p-2 space-x-2 text-gray-600 rounded-lg hover:bg-gray-100">
                  <img
                    src={photoVideo}
                    alt="photoVideo"
                    width={24}
                    height={24}
                  />
                  <span>Photo/video</span>
                </button>
                <button className="flex items-center p-2 space-x-2 text-gray-600 rounded-lg hover:bg-gray-100">
                  <img src={reel} alt="reel" width={24} height={24} />
                  <span>Reel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {isOpen && <PostPopUp toggleModal={toggleModal} />}
    </>
  );
}
