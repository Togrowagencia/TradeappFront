import { useState, useEffect } from "react";
import Traductor from "../components/Traductor";
import { login } from "../api/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/toast.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Cargar credenciales y estado del checkbox al montar el componente
  useEffect(() => {
    const savedUsername = localStorage.getItem("savedUsername");
    const savedPassword = localStorage.getItem("savedPassword");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";
    
    if (savedUsername && savedPassword && savedRememberMe) {
      setUsername(savedUsername);
      setPassword(savedPassword);
      setRememberMe(true);
      console.log("Credenciales y estado del checkbox cargados:", { 
        savedUsername, 
        savedPassword, 
        rememberMe: savedRememberMe 
      });
    }
  }, []);

  const showNotification = (message, type = "info") => {
    console.log("Mostrando notificación:", { message, type });
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

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      showNotification("Please fill in all fields", "warning");
      return;
    }

    setIsLoading(true);

    try {
      console.log("Starting login process...");
      const res = await login(username, password);
      console.log("Complete response:", res);

      if (res.data) {
        const token =
          res.data.token ||
          res.data.access_token ||
          res.data.authResponse ||
          res.data.accesToken;

        if (token) {
          // Save authentication token
          localStorage.setItem("authResponse", token);

          // Save checkbox state
          localStorage.setItem("rememberMe", rememberMe.toString());

          // Save or remove credentials based on checkbox state
          if (rememberMe) {
            localStorage.setItem("savedUsername", username);
            localStorage.setItem("savedPassword", password);
            console.log("Credentials saved in localStorage:", { username, password });
          } else {
            localStorage.removeItem("savedUsername");
            localStorage.removeItem("savedPassword");
            console.log("Credentials removed from localStorage");
          }

          showNotification("Login successful", "success");

          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 1000);
        } else {
          console.error("Unexpected response structure:", res.data);
          throw new Error("Server response does not contain a valid token");
        }
      } else {
        throw new Error("No data received from server");
      }
    } catch (err) {
      console.error("Login error:", err);

      let errorMessage = "Error trying to log in";
      if (err.message.includes("Cannot connect to server")) {
        errorMessage = "Cannot connect to server. Please verify that the server is running.";
      } else if (err.message === "Invalid credentials") {
        errorMessage = "Invalid username or password";
      } else if (err.message.includes("Server not found")) {
        errorMessage = "Server not found. Please verify the server URL.";
      } else if (err.message.includes("valid token")) {
        errorMessage = "Server response does not contain a valid token. Please verify the response structure.";
      }

      showNotification(errorMessage, "error");
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
      <div className="w-[98%] h-[98%]  flex">
        <div className="w-[50%] h-full m-[1%]">
          <img
            src="/images/panel-izquierdo-login.png"
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
              Welcome back
            </h2>
            <p className="textos-bold blanco text-center justify-center my-1 flex w-full">
              Log in to your account and continue to take advantage of our
              financial tools to trade successfully.
            </p>
          </div>

          <form className="w-[60%] h-[40%]" onSubmit={handleLogin}>
            <div className="border-b border-[#6B6B6B] flex gap-[2%] mt-[5%] pb-[1%]">
              <img src="/svg/login/user.svg" alt="" className="w-[4.8%]" />
              <input
                type="text"
                placeholder="Email"
                className="inputs-login textos blanco"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="border-b border-[#6B6B6B] flex gap-[2%] mt-[5%] pb-[1%]">
              <img src="/svg/login/pass.svg" alt="" className="w-[5.2%]" />
              <input
                type="password"
                placeholder="Password"
                className="inputs-login textos blanco"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between w-full mt-[2%]">
              <div className="flex gap-1 items-center">
                <input
                  type="checkbox"
                  id="rememberme"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="appearance-none w-4 h-4 rounded-[5px] border-[1px] border-[#D9D9D9] bg-transparent checked:bg-[#E53935] checked:border-[#D9D9D9] cursor-pointer relative"
                />
                <label htmlFor="rememberme" className="textos blanco">
                  Remember user details
                </label>
              </div>
              <a href="/envio-restablecimiento" className="textos blanco">
                Recover password
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full text-center rojo-intenso-bg textos blanco-suave my-10 py-5 rounded-[82px] ${
                isLoading ? "opacity-80 cursor-not-allowed text-login" : ""
              }`}
            >
              {isLoading ? "" : "Log in"}
            </button>
          </form>

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

export default Login;
