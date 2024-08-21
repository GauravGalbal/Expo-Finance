import { auth } from "@/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database";
import { database } from "../firebaseConfig";

export const getCurrentUser = (fn: (user: any | null) => void) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    fn(user);
  });
  return unsubscribe;
};

export const signInUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (user) {
      const token = await user.getIdToken();

      // Save token to Realtime Database under the user ID
      const userId = user.uid;
      await set(ref(database, `users/${userId}/authTokens`), {
        token: token,
      });

      console.log("User logged in and token saved:", token);
    }
    return user;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

export const signUpUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    console.log("Success", "User registered successfully!");
    return user;
  } catch (error: any) {
    console.log("Error", error.message);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    auth.signOut();
  } catch (error) {
    console.log("Error", error);
  }
};

export const getDataFromDatabase = async (path: string) => {
  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, path));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
