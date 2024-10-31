import React, { useEffect, useRef, useState } from "react";
import myImage from "../../../public/my.jpg";
import { IconX } from "@tabler/icons-react";
import photoVideo from "../../../public/photoVideo.png";
import tag from "../../../public/tag.png";
import check from "../../../public/check.png";
import live from "../../../public/live.png";
import { FieldValue, serverTimestamp } from "firebase/firestore";
import { uploadFileToStorage } from "../../firebase/fileData.ts";
import { createAPost } from "../../firebase/model.ts";

// Define the type for the toggleModal prop
interface PostPopUpProps {
  toggleModal: () => void;
}

// Assuming the Post interface looks like this
export interface Post {
  id: string;
  content: string;
  photo?: string; // Change this to only allow string or undefined
  createdAt: FieldValue;
  updatedAt: FieldValue | null;
  status: boolean;
  trash: boolean;
}

export default function PostPopUp({ toggleModal }: PostPopUpProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        toggleModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleModal]);

  // states
  const [input, setInput] = useState({
    content: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);

  // Input value changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit form
  // const handleFormCreate = async () => {
  //   try {
  //     let fileLink: string | null = null; // Initialize fileLink

  //     if (file) {
  //       fileLink = await uploadFileToStorage(file); // Upload file if present
  //     }

  //     // create a post with photo as null if no file is uploaded
  //     await createAPost("posts", {
  //       ...input,
  //       status: true,
  //       trash: false,
  //       createdAt: serverTimestamp(),
  //       updatedAt: null,
  //       photo: fileLink, // This will be null if no file is selected
  //     } as Post);

  //     // Reset form
  //     setInput({
  //       content: "",
  //     });
  //     setFile(null);
  //     setFilePreview(null);

  //     // Close the modal after successful submission
  //     toggleModal();
  //   } catch (error) {
  //     console.error("Error creating post:", error);
  //     // Optionally handle the error, e.g., show a notification
  //   }
  // };

  // Submit form
  const handleFormCreate = async () => {
    try {
      let fileLink: string | undefined; // Initialize fileLink as undefined

      if (file) {
        fileLink = await uploadFileToStorage(file); // Upload file if present
      } else {
        fileLink = undefined; // Explicitly set to undefined if no file
      }

      // Create a post object with a temporary ID
      const newPost: Post = {
        id: "", // Temporary ID or you can use a generated unique ID
        content: input.content,
        status: true,
        trash: false,
        createdAt: serverTimestamp(),
        updatedAt: null,
        photo: fileLink, // This will be undefined if no file is selected
      };

      // Pass newPost to createAPost
      await createAPost("posts", newPost); // Pass newPost with temporary id

      // Reset form
      setInput({
        content: "",
      });
      setFile(null);
      setFilePreview(null);

      // Close the modal after successful submission
      toggleModal();
    } catch (error) {
      console.error("Error creating post:", error);
      // Optionally handle the error, e.g., show a notification
    }
  };

  // For photo upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setFilePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput")?.click();
  };

  // Cancel selected file
  const cancelFile = () => {
    setFile(null);
    setFilePreview(null);
  };

  return (
    <>
      <div className="relative">
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div
            ref={modalRef}
            className="relative w-full max-w-lg p-4 bg-white rounded-lg shadow-lg"
          >
            {/* Close button */}
            <div
              className="absolute text-gray-400 cursor-pointer top-2 right-2 hover:text-gray-600"
              onClick={toggleModal}
            >
              <IconX
                stroke={2}
                className="w-8 h-8 p-2 bg-[#E4E6E9] rounded-full"
              />
            </div>

            {/* Header: Profile & Friends visibility */}
            <div className="flex items-center space-x-2">
              <img
                src={myImage}
                alt="Profile"
                className="object-cover w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">Programmer Rabbani</p>
                <button className="flex items-center space-x-1 text-sm text-gray-500">
                  <span>Friends</span> {/* Add an icon if needed */}
                </button>
              </div>
            </div>

            {/* Post input */}
            <div className="mt-4">
              <textarea
                className="w-full p-2 bg-gray-100 rounded-lg focus:outline-none"
                rows={4}
                placeholder="What's on your mind, Programmer?"
                name="content"
                value={input.content}
                onChange={handleInputChange}
              ></textarea>
            </div>

            {/* File preview */}
            {filePreview && (
              <div className="mt-4">
                <img
                  src={filePreview}
                  alt="Preview"
                  width={400}
                  height={256} // Adjust dimensions as needed
                  className="object-cover w-full h-64 rounded-lg"
                />
                <button
                  onClick={cancelFile}
                  className="mt-2 text-red-500 hover:text-red-700"
                >
                  Cancel file
                </button>
              </div>
            )}

            {/* Add to your post section */}
            <div className="p-2 mt-4 border rounded-lg">
              <p className="mb-2 text-sm text-gray-600">Add to your post</p>
              <div className="flex justify-around">
                <div>
                  <button
                    type="button"
                    className="flex items-center space-x-2 text-gray-600"
                    onClick={handleButtonClick}
                  >
                    <img
                      src={photoVideo}
                      alt="photoVideo"
                      width={24}
                      height={24}
                    />
                    <span>Photo/Video</span>
                  </button>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </div>
                <button className="flex items-center space-x-2 text-gray-600">
                  <img src={tag} alt="tag" width={24} height={24} />
                  <span>Tag Friends</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600">
                  <img src={check} alt="check" width={24} height={24} />
                  <span>Check In</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600">
                  <img src={live} alt="live" width={24} height={24} />
                  <span>Live Video</span>
                </button>
              </div>
            </div>

            {/* Post button */}
            <div className="mt-4">
              <button
                className="w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                onClick={handleFormCreate}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
