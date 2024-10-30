import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { fireBaseApp } from "./app.ts";

// Initialize Storage
export const firebaseStorage = getStorage(fireBaseApp);

/**
 * Upload File To Firebase Storage
 * @param {File} file - The file to upload
 * @returns {Promise<string>} - The download URL of the uploaded file
 */
export async function uploadFileToStorage(
  file: File
): Promise<string | undefined> {
  const storageRef = ref(firebaseStorage, file.name);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",

      (error) => {
        // Handle unsuccessful uploads
        reject(error);
      },
      async () => {
        // Handle successful uploads on complete
        const fileLink = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(fileLink);
      }
    );
  });
}

/**
 * Delete File From Firebase Storage
 * @param {string} filePath - The path to the file in storage
 * @returns {Promise<void>}
 */
export const deleteFileFromStorage = async (
  filePath: string
): Promise<void> => {
  const fileRef = ref(firebaseStorage, filePath);
  try {
    await deleteObject(fileRef);
    console.log(`File ${filePath} deleted successfully`);
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};
