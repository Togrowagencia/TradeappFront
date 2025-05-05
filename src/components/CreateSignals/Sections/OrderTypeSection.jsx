import { useEffect } from "react";
import { useClear } from "../ClearContext"; 

const OrderTypeSection = ({ selectedOrderType, isOrderSelected, handleOrderTypeClick }) => {
  const { clear } = useClear();

  useEffect(() => {
    if (clear) {
      handleOrderTypeClick(""); 
    }
  }, [clear]);

  return (
    <div className="w-[30.4%] h-[21vh] bg-[#1E1E1E] rounded-[10px] flex flex-col items-center justify-center m-2 py-7 px-6">
      <div className="w-full h-full flex justify-between">
        <h3 className="blanco">Order Type</h3>
        <input
          className={`rounded-[50px] border-[1px] ${
            !isOrderSelected
              ? "border-[#333]"
              : selectedOrderType === "Call"
              ? "border-[#00E676]"
              : "border-[#E53935]"
          } fondo-alternativo-bg w-[23%] h-[59%] text-center text-white`}
          type="text"
          value={selectedOrderType}
          readOnly
        />
      </div>

      <div className="w-full h-full flex justify-between items-center">
        <h4 className="blanco w-[25%]">Select one</h4>
        <div className="w-[73%] h-[5%] rounded-[20px] gris-antracita-bg" />
      </div>

      <div className="w-full h-full flex justify-start items-center gap-[43%]">
        <button
          onClick={() => handleOrderTypeClick("Call")}
          className={`${selectedOrderType === "Call" ? "opacity-100" : "opacity-80"} hover:bg-[#292929] hover:rounded-[5px] py-1 px-2`}
        >
          <h4 className="verde-exito">Call</h4>
        </button>
        <button
          onClick={() => handleOrderTypeClick("Put")}
          className={`${selectedOrderType === "Put" ? "opacity-100" : "opacity-80"} hover:bg-[#292929] hover:rounded-[5px] py-1 px-2`}
        >
          <h4 className="rojo-alerta">Put</h4>
        </button>
      </div>
    </div>
  );
};

export default OrderTypeSection;