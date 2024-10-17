import { useState } from "react";
import Button from "../../core/design-system/Button";
import { useAuth } from "../../core/components/AuthProvider";
import Modal from "./Modal";

export default function ButtonList() {
  const { loginGoogle } = useAuth();
  const [mode, setMode] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const onShowModal = (mode) => {
    setMode(mode);
    setModalShow(true);

    const timer = setTimeout(() => {
      const $modal = document.getElementById("modal");
      const $overlay = document.getElementById("overlay");

      $modal.classList.remove("modal--hide");
      $overlay.classList.remove("overlay--hide");
      $modal.classList.add("modal--show");
      clearTimeout(timer);
    }, 300);
  };

  const onHideModal = () => {
    const $modal = document.getElementById("modal");
    const $overlay = document.getElementById("overlay");

    $overlay.classList.add("overlay--hide");
    $modal.classList.remove("modal--show");
    $modal.classList.add("modal--hide");
  
    const timer = setTimeout(() => {
      setMode("");
      setModalShow(false);
      clearTimeout(timer);
    }, 400);
  };

  return (
    <>
      {modalShow ? <Modal mode={mode} onClose={onHideModal} /> : ""}
      <ul className="flex gap-3 flex-col btn-list mx-auto justify-self-end">
        <Button variant="secondary" onClick={loginGoogle}>
          Continuar con Google
        </Button>
        <Button variant="secondary" onClick={() => onShowModal("register")}>
          Registrarse
        </Button>
        <Button onClick={() => onShowModal("login")}>Iniciar sesión</Button>
      </ul>
    </>
  );
}
