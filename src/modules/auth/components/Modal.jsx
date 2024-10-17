import { useRef } from "react";
import { toast } from 'react-toastify';
import { MdClose } from "react-icons/md";

import Button from "../../core/design-system/Button";
import Input from "../../core/design-system/Input";
import { useAuth } from "../../core/components/AuthProvider";

export default function Modal({ mode, onClose }) {
  const { signUp, loginEmail } = useAuth();
  const formRef = useRef();
  const title = mode === "register" ? "REGISTRARSE" : "INICIAR SESIÓN";

  const onContinue = async (e) => {
    e.preventDefault();
    const form = formRef.current;
    const email = form.email.value;
    const password = form.password.value;

    try {
      if (mode === "register") {
        await signUp(email, password);
        toast.success("Registro exitoso", {
          position: "top-center"
        });
      } else {
        await loginEmail(email, password);
        toast.success("Sesión exitosa", {
          position: "top-center"
        });
      }
    } catch (error) {
      console.log({ error });
      if (mode === "register") {
        toast.error("Error al registrarse", {
          position: "top-center"
        });
      } else {
        toast.error("Error al iniciar sesión", {
          position: "top-center"
        });
      }
    }
  };

  return (
    <>
      <div
        className="overlay overlay--show"
        id="overlay"
        onClick={onClose}
      ></div>
      <form
        ref={formRef}
        id="modal"
        action=""
        className="modal modal--show bg-firstLight"
        onSubmit={onContinue}
      >
        <div className="modal-header p-5 bg-secondLight border-b">
          <h3 className="text-xl font-bold">{title}</h3>
          <MdClose size={30} onClick={onClose} className="cursor-pointer" />
        </div>
        <div className="modal-body p-5">
          <Input
            name="email"
            required
            type="email"
            title="Correo"
            className="mb-3"
            placeholder="11ejemplo@gmail.com"
            errorMsg="Digite un correo válido"
          />
          <Input
            name="password"
            required
            type="password"
            title="Contraseña"
            className="mb-6"
            placeholder="*******"
            errorMsg="Digite una contraseña válida"
          />
          <Button type="submit" className="mt-6 w-full">
            Continuar
          </Button>
        </div>
      </form>
    </>
  );
}
