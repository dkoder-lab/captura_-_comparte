import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineFileUpload, MdOutlinePhotoCamera } from "react-icons/md";

import { useAuth } from "./AuthProvider";

import anonymousSrc from "../../../assets/images/anonymous.png";
import Button from "../design-system/Button";
import Logo from "./Logo";
import Camera from "./Camera";

import "../styles/current-layout.css";
import { FaPlus } from "react-icons/fa";

export default function CurrentLayout({ children, isProfile, ...anotherProps }) {
  const { logout, user } = useAuth();
  const [showList, setShowList] = useState(false);
  const [modeMenuShowabel, setModeMenuShowabel] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [file, setFile] = useState(null);

  const onStopPropagation = (e) => {
    e.stopPropagation();
  };

  const onToggleMenu = (e, val) => {
    onStopPropagation(e);
    if (val || showList) {
      const $showList = document.getElementById("showList");
      $showList.classList.add("list-profile--hidden");
      $showList.classList.remove("list-profile--showable");

      const timer = setTimeout(() => {
        setShowList(false);
        clearTimeout(timer);
      }, 250);
    } else {
      setShowList(true);
      const timer = setTimeout(() => {
        const $showList = document.getElementById("showList");
        $showList.classList.remove("list-profile--hidden");
        $showList.classList.add("list-profile--showable");
        clearTimeout(timer);
      }, 250);
    }
  };

  const onLogout = (e) => {
    onStopPropagation(e);
    logout();
  };

  const onShowBottomMenu = (e) => {
    e.stopPropagation();
    setModeMenuShowabel(true);
    const $btnAdd = document.getElementById("btn-add");
    const $circleContainerBtns = document.getElementById("circle-container-btns");
    $btnAdd?.classList.add("big-circle");
    $circleContainerBtns?.classList.remove("hidden-big-circle");
  };

  const onCloseAdd = () => {
    const $btnAdd = document.getElementById("btn-add");
    const $circleContainerBtns = document.getElementById("circle-container-btns");
    $btnAdd.classList.remove("big-circle");
    $circleContainerBtns.classList.add("hidden-big-circle");

    const timer = setTimeout(() => {
      setModeMenuShowabel(false);
      clearTimeout(timer);
    }, 150);
  };

  const onShowCamera = (hasFile) => {
    console.log(hasFile);
    if (!hasFile) setFile(null);
    setShowCamera(true);
  };

  const onCloseCamera = () => {
    setShowCamera(false);
  };

  const onOpenFiles = () => {
    document.getElementById("image-file-input").click()
  };

  const onUploadImage = (e) => {
    setFile(e.target.files[0]);
    onShowCamera(true);
  };

  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      const $showList = document.getElementById("showList");
      const $circleContainerBtns = document.getElementById("circle-container-btns");

      if (!showList && $showList) {
        onToggleMenu(e, true);
      }

      if ($circleContainerBtns) {
        onCloseAdd();
      }
    });
  }, []);

  return (
    <section className="grid current-layout h-full" {...anotherProps}>
      <header className="flex header items-center justify-between p-5 bg-dark">
        <Logo />
        <figure className="relative">
          <img className="image-profile" src={user.photoURL || anonymousSrc} alt="anonymous" onClick={onToggleMenu} />
          {showList ? (
            <ul
              className="list-profile list-profile--showable absolute p-3 text-center"
              onClick={onStopPropagation}
              id="showList"
            >
              <li className="text-lg pb-2" onClick={onStopPropagation}>{user.email}</li>
              <li onClick={onLogout} className="text-lg font-bold pt-2 border-t-2">Cerrar sesión</li>
            </ul>
          ) : ''}
        </figure>
      </header>
      { children }
      <footer className="footer p-5 bg-secondLight flex justify-between items-start fixed pb-6">
        <NavLink
          to="/comunidad"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Comunidad
        </NavLink>
        <NavLink
          to="/mis_aventuras"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Mis aventuras
        </NavLink>
        <Button id="btn-add" variant="circle" className="flex items-center justify-center" onClick={onShowBottomMenu}>
          {modeMenuShowabel ? '' : <FaPlus size={40} />}
        </Button>
        {modeMenuShowabel ? (
          <div className="circle-container-btns rounded-full" id="circle-container-btns" onClick={(e) => e.stopPropagation()}>
            <FaPlus size={30} onClick={onCloseAdd} className="cursor-pointer mx-auto mb-5" style={{ transform: "rotate(45deg)" }} />
            <ul className="list-btns">
              <input type="file" accept="image/*" onChange={onUploadImage} style={{ display: "none" }} name="image" id="image-file-input" />
              <li className="btn-item rounded-full bg-primary p-3" onClick={onOpenFiles}>
                <MdOutlineFileUpload size={50} />
              </li>
              <li className="btn-item rounded-full bg-primary p-3" onClick={() => onShowCamera()}>
                <MdOutlinePhotoCamera size={50} />
              </li>
            </ul>
          </div>
        ) : ''}
      </footer>
      {
        showCamera ? <Camera onClose={onCloseCamera} file={file} /> : ''
      }
    </section>
  );
}
