import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import 'sweetalert2/src/sweetalert2.scss';
import { resetPassword } from "../api/auth";
import Traductor from "../components/Traductor";

export const Resetpassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [conditions, setConditions] = useState({
    lengthValid: false,
    numberValid: false,
    specialValid: false,
    coincide: false,
  });

  const [activeCount, setActiveCount] = useState(0);
  const [leavingCount, setLeavingCount] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      Swal.fire({
        title: "Error",
        text: "Invalid reset token",
        icon: "error",
        background: "#16171C",
        color: "#fff",
        confirmButtonColor: "#E53935",
        customClass: {
          popup: 'custom-popup-class',
          confirmButton: 'custom-confirm-button'
        }
      });
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    const validConditions = [
      conditions.lengthValid,
      conditions.specialValid,
      conditions.numberValid,
    ];
    const count = validConditions.filter(Boolean).length;

    if (count < activeCount) {
      // animación de salida: primero muestra las que se van
      setLeavingCount(activeCount - count);
      setTimeout(() => {
        setActiveCount(count);
        setLeavingCount(0);
      }, 500); // misma duración que la animación de salida
    } else {
      setActiveCount(count);
    }
  }, [conditions]);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const lengthValid = newPassword.length >= 8;
    const numberValid = /\d/.test(newPassword);
    const specialValid = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
    const coincide = newPassword === password2;

    setConditions((prev) => ({
      ...prev,
      lengthValid,
      numberValid,
      specialValid,
      coincide,
    }));

    const newCount =
      Number(lengthValid) + Number(numberValid) + Number(specialValid);

    if (newCount < activeCount) {
      setLeavingCount(activeCount - newCount);
      setTimeout(() => setLeavingCount(0), 400);
    }
    setActiveCount(newCount);
  };

  const handlePasswordChange2 = (e) => {
    const newPassword2 = e.target.value;
    setPassword2(newPassword2);
    const coincide = newPassword2 === password;
    setConditions((prev) => ({ ...prev, coincide }));
  };

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
      <img src="\svg\login\pass.svg" alt="" className="w-[4%]" />
    ) : null;

  const getColor = () => {
    if (activeCount === 3) return "verde-exito-bg";
    if (activeCount === 2) return "bg-[#FFC107]";
    if (activeCount === 1) return "bg-[#FF9800]";
    if (activeCount === 0) return "rojo-alerta-bg";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      Swal.fire({
        title: "Error",
        text: "Invalid reset token",
        icon: "error",
        background: "#16171C",
        color: "#fff",
        confirmButtonColor: "#E53935",
        customClass: {
          popup: 'custom-popup-class',
          confirmButton: 'custom-confirm-button'
        }
      });
      return;
    }

    if (!password || !password2) {
      Swal.fire({
        title: "Error",
        text: "Please fill in all fields",
        icon: "warning",
        background: "#16171C",
        color: "#fff",
        confirmButtonColor: "#E53935",
        customClass: {
          popup: 'custom-popup-class',
          confirmButton: 'custom-confirm-button'
        }
      });
      return;
    }
    if (password !== password2) {
      Swal.fire({
        title: "Error",
        text: "Passwords do not match",
        icon: "error",
        background: "#16171C",
        color: "#fff",
        confirmButtonColor: "#E53935",
        customClass: {
          popup: 'custom-popup-class',
          confirmButton: 'custom-confirm-button'
        }
      });
      return;
    }

    try {
      const response = await resetPassword(token, password);
      console.log('Server response:', response.data);

      Swal.fire({
        title: "Success",
        text: "Password has been reset successfully",
        icon: "success",
        background: "#16171C",
        color: "#fff",
        confirmButtonColor: "#00E676",
        customClass: {
          popup: 'custom-popup-class',
          confirmButton: 'custom-confirm-button'
        }
      });

      navigate("/");
    } catch (error) {
      console.error('Error resetting password:', error);
      Swal.fire({
        title: "Error",
        text: error.message || "An error occurred while resetting the password",
        icon: "error",
        background: "#16171C",
        color: "#fff",
        confirmButtonColor: "#E53935",
        customClass: {
          popup: 'custom-popup-class',
          confirmButton: 'custom-confirm-button'
        }
      });
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center fondo-bg">
      <div className="w-[99%] h-[97vh] rounded-[35px] bg-[url('/images/imagen-reset.png')] bg-center bg-cover bg-no-repeat flex flex-col justify-center items-center relative">

        <div className="flex justify-end items-center w-full px-[3%] py-[1.5%] absolute top-0">
          <div className="w-auto border-[1px] border-[#999] rounded-[18px] flex items-center h-auto justify-start py-1 hover:bg-[#333] hover:border-[#333]">
            <Traductor />
          </div>
        </div>

        <div className="w-[38.5%] h-[75%] lp:h-[55vh] lpm:h-[50vh] fondo-bg border-[1px] border-[#E53935] rounded-[35px] flex flex-col justify-center items-start px-[4%] py-[3%]">
          <div className="flex flex-col justify-center items-center gap-[8%] w-full h-[20%]">
            <h2 className="rojo-alerta text-center">Reset Password</h2>
            <p className="textos-bold blanco text-center">
              Your password will be sent to your email once it is reset
            </p>
          </div>

          <div className="w-full h-[90%] flex flex-col justify-center items-start gap-[4%]">
            <form
              className="w-full h-full flex flex-col justify-start mt-8 gap-[2%]"
              onSubmit={handleSubmit}
            >
              <h4 className="blanco">New Password</h4>
              <div className="border-b border-[#686868] w-full h-[12%] pl-[10px] flex flex-row justify-between items-center">
                {conditions.lengthValid &&
                  conditions.numberValid &&
                  conditions.specialValid
                  ? getSVGinput("check")
                  : getSVGinput("error")}
                <input
                  type={showPassword ? "text" : "password"}
                  className="inputs-login textos blanco"
                  placeholder="Ingresa tu contraseña"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <img
                  src="\svg\reset\ojo.svg"
                  alt=""
                  onClick={togglePassword}
                  className="cursor-pointer"
                />
              </div>

              <div className="mb-[10px] flex gap-1">
                {/* Barras activas */}
                {[...Array(activeCount)].map((_, i) => (
                  <div
                    key={`active-${i}`}
                    className={`${getColor()} custom-confirm h-[4px] rounded-full`}
                  />
                ))}

                {/* Barras salientes */}
                {[...Array(leavingCount)].map((_, i) => (
                  <div
                    key={`leaving-${i}`}
                    className={`${getColor()} custom-confirm shrink h-[4px] rounded-full`}
                  />
                ))}
              </div>

              <div>
                <p
                  className={`p-reset textos-peques ${conditions.lengthValid ? "valid" : "invalid"
                    }`}
                >
                  {conditions.lengthValid ? getSVG("check") : getSVG("error")} 8
                  characters
                </p>
                <p
                  className={`p-reset textos-peques ${conditions.numberValid ? "valid" : "invalid"
                    }`}
                >
                  {conditions.numberValid ? getSVG("check") : getSVG("error")}{" "}
                  Must contain at least one number
                </p>
                <p
                  className={`p-reset textos-peques ${conditions.specialValid ? "valid" : "invalid"
                    }`}
                >
                  {conditions.specialValid ? getSVG("check") : getSVG("error")}{" "}
                  Must contain at least one special character
                </p>
              </div>

              <h4 className="blanco">Confirm your password</h4>
              <div className="border-b border-[#686868] w-full h-[12%] pl-[10px] mb-[10px] flex flex-row justify-between items-center">
                {conditions.coincide
                  ? getSVGinput("check")
                  : getSVGinput("error")}
                <input
                  type={showPassword ? "text" : "password"}
                  className="inputs-login textos blanco"
                  placeholder="Ingresa tu contraseña"
                  name="password2"
                  value={password2}
                  onChange={handlePasswordChange2}
                />
                <img
                  src="\svg\reset\ojo.svg"
                  alt=""
                  onClick={togglePassword}
                  className="cursor-pointer"
                />
              </div>
              <div>
                <p
                  className={`p-reset textos-peques ${conditions.coincide ? "valid" : "invalid"
                    }`}
                >
                  {conditions.coincide ? getSVG("check") : getSVG("error")} Your
                  password matches
                </p>
              </div>

              <div className="flex items-center justify-start gap-[2%] w-full">
                <button className="w-auto py-2 px-4 text-center rojo-alerta-bg textos blanco mt-5 p-2 rounded-[20px]">
                  Reset password
                </button>
                <a
                  href="/"
                  className="w-auto py-2 px-4 text-center border border-[#292929] textos blanco mt-5 p-2 rounded-[35px]"
                >
                  Cancel
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resetpassword;
