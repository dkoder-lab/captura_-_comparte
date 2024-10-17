// useUploadImage.js
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getStorage } from "firebase/storage";
import app from "../utils/firebase";
import { randomStrings } from "../utils/random";

const useUploadImage = () => {
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");
  const [storagePath, setStoragePath] = useState("");
  const [error, setError] = useState(null);
  const storage = getStorage(app);

  // Receive the image file and upload it to Firebase Storage
  const uploadImage = (image) => {
    return new Promise((resolve, reject) => {
      if (!image) {
        reject("No image provided");
        return;
      }

      const storageName = `images/${randomStrings()}_${image.name}`;

      const storageRef = ref(storage, storageName);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          setError(error);
          console.error("Error uploading image:", error);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setUrl(downloadURL);
            setStoragePath(storageName);
            resolve(downloadURL);
          } catch (err) {
            setError(err);
            reject(err);
          }
        }
      );
    });
  };

  return { uploadImage, progress, url, error, storagePath };
};

export default useUploadImage;
