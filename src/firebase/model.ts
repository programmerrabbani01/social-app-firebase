import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  FieldValue,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";

// Define the shape of a post
import { Timestamp } from "firebase/firestore"; // Import the Timestamp type from Firestore
import { fireBaseApp } from "./app.ts";

export interface Post {
  id: string;
  content: string;
  photo?: string;
  createdAt?: Timestamp | FieldValue | null; // Allow FieldValue and null
  status?: boolean; // Change this to boolean if you need it as such
  trash?: boolean; // Optional properties
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
// create fireStore database

const database = getFirestore(fireBaseApp);

/**
 * Get All Post Data From FireStore Database
 */

export const getAllPosts = async (colName: string): Promise<Post[]> => {
  // get all posts data
  const posts = await getDocs(collection(database, colName));

  // process posts data

  const postsDataList: Post[] = [];

  posts.forEach((post) => {
    postsDataList.push({ ...post.data(), id: post.id } as Post);
  });

  return postsDataList;
};
/**
 * Get All Post Data From FireStore Database
 * Realtime Data Get
 */

export const getAllPostsRealTime = (
  colName: string,
  updateState: (posts: Post[]) => void // This should remain as a function type
) => {
  const unsubscribe = onSnapshot(
    query(collection(database, colName), orderBy("createdAt", "desc")),
    (snapShot) => {
      const postsDataList: Post[] = [];
      snapShot.docs.forEach((doc) => {
        postsDataList.push({ ...doc.data(), id: doc.id } as Post);
      });
      updateState(postsDataList);
    },
    (error) => {
      console.error("Error fetching posts:", error);
    }
  );

  return unsubscribe; // Return the unsubscribe function
};

/**
 * Get A Single Post Data From FireStore Database
 */

export const getASinglePost = async (
  colName: string,
  id: string
): Promise<Post | undefined> => {
  // Get a single post data
  const post = await getDoc(doc(database, colName, id));

  // Return post data
  return post.data() as Post; // Cast to Post type
};

/**
 * Delete A Single post Data From FireStore Database
 * include image deletion
 */

export const getDeleteAPost = async (
  colName: string,
  id: string,
  imagePath?: string | null // Allow for undefined as well
) => {
  const docRef = doc(database, colName, id);

  // If imagePath exists, delete the image from Firebase Storage
  if (imagePath) {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);
    await deleteObject(imageRef)
      .then(() => {
        console.log("Image deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
      });
  }

  // Delete the post document
  await deleteDoc(docRef);
};

/**
 * Create A New Post Data For FireStore Database
 * docId  create with id
 * otherwise create with autoId
 */

export const createAPost = async (
  colName: string,
  data: Post,
  docId: string | null = null
) => {
  // Create a new Post
  if (docId) {
    await setDoc(doc(database, colName, docId), data);
  } else {
    await addDoc(collection(database, colName), data);
  }
};

/**
 * Update A Post Data For FireStore Database
 */

export const updateAPost = async (
  collection: string,
  id: string,
  data: Partial<Post & { photo: string | null }>
): Promise<void> => {
  try {
    await updateDoc(doc(database, collection, id), data);
  } catch (error) {
    console.error("Error updating post:", error);
    throw new Error("Failed to update post");
  }
};

/**
 * USERS RELATED
 */

/**
 * Get All Users Data From FireStore Database
 * Realtime Data Get
 */

export const getAllUsersRealTime = async (
  colName: string,
  updateState: (users: FireStoreUser[]) => void
) => {
  onSnapshot(
    query(collection(database, colName), orderBy("createdAt", "desc")),
    (snapShot) => {
      const usersDataList: FireStoreUser[] = [];
      snapShot.docs.forEach((doc) => {
        usersDataList.push({ ...doc.data(), id: doc.id } as FireStoreUser);
      });
      updateState(usersDataList);
    }
  );
};

/**
 * Get A Single User Data From FireStore Database
 */

export const getASingleUser = async (
  colName: string,
  id: string
): Promise<FireStoreUser | undefined> => {
  // Get a single user data
  const user = await getDoc(doc(database, colName, id));

  // Return user data
  return user.data() as FireStoreUser; // Cast to user type
};

/**
 * Delete A Single User Data From FireStore Database
 */

export const getDeleteAUser = async (
  colName: string,
  id: string,
  imagePath?: string | null // Allow for undefined as well
) => {
  const docRef = doc(database, colName, id);

  // If imagePath exists, delete the image from Firebase Storage
  if (imagePath) {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);
    await deleteObject(imageRef)
      .then(() => {
        console.log("Image deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
      });
  }

  // Delete the post document
  await deleteDoc(docRef);
};

/**
 * Create A New User Data For FireStore Database
 * docId  create with id
 * otherwise create with autoId
 */

export const createAUser = async (
  colName: string,
  data: FireStoreUser,
  docId: string | null = null
) => {
  // Create a new Post
  if (docId) {
    await setDoc(doc(database, colName, docId), data);
  } else {
    await addDoc(collection(database, colName), data);
  }
};

/**
 * Update A User Data For FireStore Database
 */

export const updateAUser = async (
  collection: string,
  id: string,
  data: Partial<FireStoreUser & { photo: string | null }>
): Promise<void> => {
  try {
    await updateDoc(doc(database, collection, id), data);
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed To Update User");
  }
};
