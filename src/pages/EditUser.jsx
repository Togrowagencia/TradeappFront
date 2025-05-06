import { useState, useEffect } from "react";
import Traductor from "../components/Traductor";
import "react-toastify/dist/ReactToastify.css";
import "../styles/toast.css";
import { editUser } from "../api/user";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export const EditUser = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [conditions, setConditions] = useState({
    lengthValid: false,
    numberValid: false,
    specialValid: false
  });
  const [activeCount, setActiveCount] = useState(0);
  const [leavingCount, setLeavingCount] = useState(0);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === "password") {
      const lengthValid = value.length >= 8;
      const numberValid = /\d/.test(value);
      const specialValid = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      const newConditions = {
        lengthValid,
        numberValid,
        specialValid
      };

      const validConditions = [
        newConditions.lengthValid,
        newConditions.specialValid,
        newConditions.numberValid,
      ];
      const newCount = validConditions.filter(Boolean).length;

      if (newCount < activeCount) {
        setLeavingCount(activeCount - newCount);
        setTimeout(() => setLeavingCount(0), 400);
      }

      setConditions(newConditions);
      setActiveCount(newCount);
    }
  };

  useEffect(() => {
    const validConditions = [
      conditions.lengthValid,
      conditions.specialValid,
      conditions.numberValid,
    ];
    const count = validConditions.filter(Boolean).length;
    setActiveCount(count);
  }, [conditions]);

  const getSVG = (type) =>
    type === "check" ? (
      <img src="\svg\reset\correcto.svg" alt="" />
    ) : type === "error" ? (
      <img src="\svg\reset\incorrecto.svg" alt="" />
    ) : null;

  const getSVGinput = (type) =>
    type === "check" ? (
      <img src="\svg\login\passv.svg" alt="" className="w-[4%]" />
    ) : type === "error" ? (
      <img src="/svg/reset/password.svg" alt="" className="w-[4%]" />
    ) : null;

  const getColor = () => {
    if (activeCount === 3) return "verde-exito-bg";
    if (activeCount === 2) return "bg-[#FFC107]";
    if (activeCount === 1) return "bg-[#FF9800]";
    if (activeCount === 0) return "rojo-alerta-bg";
  };

  const showNotification = (message, type = "info") => {
    switch (type) {
      case "success":
        toast.success(message, {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        break;
      case "error":
        toast.error(message, {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        break;
      case "warning":
        toast.warning(message, {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        break;
      default:
        toast.info(message, {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Solo validar contraseña si se está intentando cambiar
    if (formData.password && (!conditions.lengthValid || !conditions.numberValid || !conditions.specialValid)) {
      showNotification("La contraseña no cumple con los requisitos", "warning");
      return;
    }

    setIsLoading(true);
    
    try {
      if (!id) {
        throw new Error("ID de usuario no encontrado");
      }

      // Solo enviamos los campos que han sido modificados
      const dataToSend = {};
      if (formData.name) dataToSend.name = formData.name;
      if (formData.email) dataToSend.email = formData.email;
      if (formData.password) dataToSend.password = formData.password;
      if (formData.role) dataToSend.role = formData.role;

      await editUser(id, dataToSend);
      showNotification("Usuario actualizado exitosamente", "success");
      navigate("/users");
    } catch (error) {
      showNotification(error.message || "Error al actualizar el usuario", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="w-[98%] h-[98%] flex">
        <div className="w-[50%] h-full m-[1%]">
          <img
            src="/images/Imagenregister.png"
            className="w-full h-[95.4vh] object-[right]"
          />
        </div>
        <div className="w-[50%] flex flex-col justify-center items-center m-[1%]">
          <div className="flex justify-end items-center w-full my-[4%]">
            <div className="w-auto border-[1px] border-[#999] rounded-[18px] flex items-center h-auto justify-start py-1 hover:bg-[#333] hover:border-[#333]">
              <Traductor />
            </div>
          </div>

          <img src="/images/logo.png" className="p-9" />
          <div className="w-[60%]">
            <h2 className="rojo-alerta my-2 justify-center flex">
              Edit User
            </h2>
            <p className="textos-bold blanco text-center justify-center my-1 flex w-full">
              Update your profile to keep your financial tools personalized and up to date for even greater success in the markets.
            </p>
          </div>

          <form className="w-[60%] h-[40%]" onSubmit={handleSubmit}>


            <div className="flex gap-[2%] w-full justify-center items-center">
              <div className="border-b border-[#6B6B6B] flex gap-[2%] mt-[5%] pb-[1%] w-[50%]">
                <img src="/svg/login/user.svg" alt="" className="w-[8.5%]" />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="inputs-login textos blanco"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>


              <div className="border-b border-[#6B6B6B] flex gap-[2%] mt-[5%] pb-[1%] w-[50%]">
                <img src="/svg/reset/correo.svg" alt="" className="w-[10%]" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="inputs-login textos blanco"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="border-b border-[#6B6B6B] flex gap-[2%] mt-[5%] pb-[1%]">
              {conditions.lengthValid && conditions.numberValid && conditions.specialValid
                ? getSVGinput("check")
                : getSVGinput("error")}
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="inputs-login textos blanco"
                value={formData.password}
                onChange={handleChange}
              />
              <img
                src="\svg\reset\ojo.svg"
                alt=""
                onClick={togglePassword}
                className="cursor-pointer"
              />
            </div>

            <div className="my-[2%] flex gap-1">
              {[...Array(activeCount)].map((_, i) => (
                <div
                  key={`active-${i}`}
                  className={`${getColor()} custom-confirm h-[0.4rem] rounded-full`}
                />
              ))}
              {[...Array(leavingCount)].map((_, i) => (
                <div
                  key={`leaving-${i}`}
                  className={`${getColor()} custom-confirm shrink h-[0.4rem] rounded-full`}
                />
              ))}
            </div>

            <div>
              <p className={`p-reset textos-peques ${conditions.lengthValid ? "valid" : "invalid"}`}>
                {conditions.lengthValid ? getSVG("check") : getSVG("error")} 8 caracteres
              </p>
              <p className={`p-reset textos-peques ${conditions.numberValid ? "valid" : "invalid"}`}>
                {conditions.numberValid ? getSVG("check") : getSVG("error")} Debe contener al menos un número
              </p>
              <p className={`p-reset textos-peques ${conditions.specialValid ? "valid" : "invalid"}`}>
                {conditions.specialValid ? getSVG("check") : getSVG("error")} Debe contener al menos un carácter especial
              </p>
            </div>

            <button
              type="submit"
              className={`w-full text-center rojo-intenso-bg textos blanco-suave mt-3 mb-6 py-5 rounded-[82px] ${isLoading ? "text-loading-edit" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "" : "Save Changes"}
            </button>
          </form>

          <div className="w-[60%] flex justify-center items-center">
            <a href="/users" className="textos-peques blanco-suave flex items-center w-[65%] justify-center">
              Go back to the users list
            </a>
          </div>

          <div className="w-[55%] h-full flex justify-between items-end">
            <a className="textos-peques blanco-suave flex items-center w-[65%]">
              Terms and Conditions
            </a>
            <a
              href=""
              className="textos-peques blanco-suave w-[35%] flex items-center justify-end"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUser;
