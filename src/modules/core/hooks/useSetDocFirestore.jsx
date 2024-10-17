// useSaveToFirestore.js
import {
  doc,
  setDoc,
  getFirestore,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import app from "../utils/firebase";
import { mainCollection } from "./magicStrings";
import { randomStrings } from "../utils/random";

const useSetDoc = () => {
  const db = getFirestore(app);
  const setDocument = async (imageData) => {
    if (!imageData?.id) {
      imageData.id = randomStrings(16);
    }
    if (!imageData?.userId) {
      throw new Error("No userId provided");
    }
    try {
      const toSave = {
        updatedAt: Timestamp.now(),
        ...imageData,
      };
      const docRef = await setDoc(doc(db, mainCollection, toSave.id), toSave);
      return docRef;
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  };

  const updateDocument = async (id, imageData) => {
    if (!id) {
      throw new Error("No id provided");
    }
    try {
      const toSave = {
        updatedAt: Timestamp.now(),
        ...imageData,
      };
      const docRef = await updateDoc(doc(db, mainCollection, id), toSave);
      return docRef;
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  };

  return { setDocument, updateDocument };
};

export default useSetDoc;
