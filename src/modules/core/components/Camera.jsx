import { useState } from "react";
import Webcam from "react-webcam";
import { MdOutlinePhotoCamera, MdClose } from "react-icons/md";

import Button from "../design-system/Button";
import useUploadImage from "../hooks/useUploadImage";
import useSetDoc from "../hooks/useSetDocFirestore";
import { useAuth } from "./AuthProvider";
import FilterOption from "./FilterOption";

import "../styles/camera.css";
import { toast } from "react-toastify";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

export default function Camera({ onClose }) {
  const [localUrl, setLocalUrl] = useState("");
  const { uploadImage, storagePath } = useUploadImage();
  const { user } = useAuth();
  const { setDocument } = useSetDoc();
  const [aplyFilters, setAplyFilters] = useState(false);
  const [customFilter, setCustomFilter] = useState({
    contrast: 100,
    brightness: 100,
    saturate: 100,
    sepia: 0,
    gray: 0,
  });
  const filterOpts = [
    {
      label: "Contraste",
      defaultValue: 100,
      field: "contrast",
    },
    {
      label: "Brillo",
      defaultValue: 100,
      field: "brightness",
    },
    {
      label: "Saturación",
      defaultValue: 100,
      field: "saturate",
    },
    {
      label: "Sepia",
      defaultValue: 0,
      field: "sepia",
    },
    {
      label: "Gris",
      defaultValue: 0,
      field: "gray",
    },
  ];

  const saveRegistry = (url) => {
    const registry = {
      userId: user.uid,
      imageUrl: url,
      storagePath,
      creator: user.email,
      likes: [],
    };
    return setDocument(registry).then(() => {
      toast.success("Fotografia subida exitosamente", {
        position: "top-center"
      });
      onClose();
    });
  };

  const onSave = async () => {
    return new Promise((resolve, reject) => {
      const $localUrl = document.getElementById("localUrl");
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");

      canvas.height = $localUrl.naturalHeight;
      canvas.width = $localUrl.naturalWidth;
      // TODO: Add a copy of filters in canvas
      context.drawImage($localUrl, 0, 0);

      canvas.toBlob(async (blob) => {
        const file = new File([blob], "photo.jpeg", { type: "image/jpeg" });
        uploadImage(file)
          .then((url) => {
            resolve(url);
            return saveRegistry(url);
          })
          .catch((error) => {
            toast.error("Hubo un error al guardar cambios", {
              position: "top-center"
            });
            reject(error);
          });
      }, "image/jpeg");
    });
  };

  return (
    <div className="modal-camera">
      <div className="header absolute flex justify-end p-3 z-50">
        <MdClose size={30} onClick={onClose} className="cursor-pointer" />
      </div>
      <div className="modal-camera-body">
        <div className="tap"></div>
        {!localUrl ? (
          <Webcam
            audio={false}
            height={720}
            screenshotFormat="image/jpeg"
            width={1280}
            videoConstraints={videoConstraints}
          >
            {({ getScreenshot }) => (
              <button
                className="btn-item btn-item--modal rounded-full bg-primary p-3"
                onClick={() => {
                  const imageSrc = getScreenshot();
                  setLocalUrl(imageSrc);
                }}
              >
                <MdOutlinePhotoCamera size={50} />
              </button>
            )}
          </Webcam>
        ) : (
          <>
            <img
              alt="localUrl"
              src={localUrl}
              id="localUrl"
              className="localUrl"
              style={{
                height: aplyFilters ? "fit-content" : "400px",
                maxHeight: aplyFilters ? "400px" : "auto",
                minHeight: aplyFilters ? "380px" : "auto",
                filter: `contrast(${customFilter.contrast}%) brightness(${customFilter.brightness}%) saturate(${customFilter.saturate}%) sepia(${customFilter.sepia}%) grayScale(${customFilter.gray}%)`,
              }}
            />
            <div className="relative w-full px-5 pb-5">
              {aplyFilters ? (
                <>
                  <div className="container-filters-select pb-5 pt-5">
                    {filterOpts.map((option) => (
                      <FilterOption
                        customFilter={customFilter}
                        setCustomFilter={setCustomFilter}
                        option={option}
                        key={option.field}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between gap-4">
                    <Button
                      variant="secondary"
                      onClick={() => setAplyFilters(false)}
                      style={{ flex: 1 }}
                    >
                      Atrás
                    </Button>
                    <Button variant="primary" onClick={onSave}>
                      Guardar
                    </Button>
                  </div>
                </>
              ) : (
                <div className="fixed filterApliedBox">
                  <p
                    className="text-xl font-semibold mb-5 text-primary underline w-fit"
                    onClick={() => setAplyFilters(true)}
                  >
                    Aplicar filtros
                  </p>
                  <div className="flex justify-between gap-4">
                    <Button
                      variant="secondary"
                      onClick={() => setLocalUrl("")}
                      style={{ flex: 1 }}
                    >
                      Volver a intentar
                    </Button>
                    <Button variant="primary" onClick={onSave}>
                      Guardar
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
