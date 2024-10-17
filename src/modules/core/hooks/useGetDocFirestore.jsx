import {
  collection,
  getFirestore,
  query,
  doc,
  getDoc,
  onSnapshot,
  getDocs,
  where,
  orderBy,
  startAt,
  limit,
} from "firebase/firestore";
import app from "../utils/firebase";
import { mainCollection } from "./magicStrings";

const db = getFirestore(app);
const collectionRef = collection(db, mainCollection);

const useGetDoc = () => {
  const getDocument = async (id) => {
    if (!id) {
      throw new Error("No id provided");
    }
    try {
      const docRef = doc(db, mainCollection, id);
      const docsnap = await getDoc(docRef);
      if (!docsnap.exists()) {
        return null;
      }
      console.log(docsnap.data(), "data");
      return docsnap.data();
      // return doc.data();
    } catch (error) {
      console.error("Error getting document: ", error);
      throw error;
    }
  };

  const getDocumentRealTime = (id, callback) => {
    if (!id) {
      throw new Error("No id provided");
    }
    if (typeof callback !== "function") {
      throw new Error("No callback function provided");
    }
    try {
      const docRef = doc(db, mainCollection, id);
      const unsubscribe = onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
          callback(doc.data());
        } else {
          console.log("Document no longer exists!");
          callback(null);
          unsubscribe();
        }
      });
      return unsubscribe;
    } catch (error) {
      console.error("Error getting document: ", error);
      throw error;
    }
  };

  const queryBuilder = (filter) => {
    const whereField = filter?.where?.field;
    const whereValue = filter?.where?.value;
    const whereOperator = filter?.where?.operator;
    // const orderField = filter?.order?.by || "UpdatedAt";
    // const order = filter?.order?.direction || "desc";
    // const skip = filter?.skip || 0;
    // const limitRegistries = filter?.limit || 10;
    if (whereField && whereValue && whereOperator) {
      console.log("whereField", whereField);
      return query(
        collectionRef,
        where(whereField, whereOperator, whereValue)
        // orderBy(orderField, order),
        // startAt(skip)
        // limit(limitRegistries)
      );
    } else {
      console.log("orderField");
      return query(
        collectionRef
        // orderBy(orderField, order),
        // startAt(skip)
        // limit(limitRegistries)
      );
    }
  };

  const getDocumentsByFilter = async (filter) => {
    try {
      const q = queryBuilder(filter);
      const querySnapshot = await getDocs(q);
      const docList = [];
      querySnapshot.forEach((doc) => {
        docList.push({ id: doc.id, ...doc.data() });
      });
      return docList;
    } catch (error) {
      console.error("Error getting documents: ", error);
      throw error;
    }
  };

  const getAllDocuments = async () => {
    try {
      const docsnap = await getDocs(collectionRef);
      const docList = [];
      docsnap.forEach((doc) => {
        docList.push({ id: doc.id, ...doc.data() });
      });
      return docList;
    } catch (error) {
      console.error("Error getting documents: ", error);
      throw error;
    }
  };

  const getDocumentsByFilterRealTime = (filter, callback) => {
    if (typeof callback !== "function") {
      throw new Error("No callback function provided");
    }
    try {
      const q = queryBuilder(filter);
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        callback(docs);
      });
      return unsubscribe;
    } catch (error) {
      console.error("Error getting documents: ", error);
      throw error;
    }
  };

  return {
    getDocument,
    getDocumentRealTime,
    getDocumentsByFilter,
    getDocumentsByFilterRealTime,
    getAllDocuments,
  };
};

export default useGetDoc;
