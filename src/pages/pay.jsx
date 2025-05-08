import React from "react";
import "react-toastify/dist/ReactToastify.css";

export const Pay = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center fondo-bg">
      <div className="w-[60%] h-[60vh] flex flex-col justify-center items-center gap-4 text-center">
        <img src="\svg\pay\check.svg" alt="" className="w-[6.5rem] h-[6.5rem]" />
        <h2 className="verde-exito">Payment Successful</h2>
        <p className="blanco textos">
          Thank You! Your Subscription Has Been Activated. You Now Have Full
          Access To The App
        </p>

        <div className="flex flex-wrap justify-center items-center">
          <h4 className="blanco flex flex-wrap justify-center items-center w-full ">
            Plan: <span className="verde-exito mx-1.5 break-words">$30 USD / Month</span> Next Billing Date: 10/06/2025
          </h4>
        </div>

        <ul className="flex flex-col gap-1 text-start">
          <li className="blanco textos">· Enjoy All Premium Features</li>
          <li className="blanco textos">· A Confirmation Email Has Been Sent To You </li>
        </ul>
      </div>

     {/* <div className="flex justify-center items-end w-full lp:mt-[10rem]">
        <button className="verde-exito-bg border-[1px] border-[#00e676] py-[1rem] px-[14vh] rounded-[50px] flex justify-center items-center">
          <h4 className="negro">Go to the app</h4>
        </button>
      </div> */}
    </div>
  );
};

export default Pay;
