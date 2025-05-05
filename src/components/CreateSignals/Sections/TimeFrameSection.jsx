// TimeFrameSection.jsx
import { useEffect } from "react";
import { useClear } from "../ClearContext";

const TimeFrameSection = ({ selectedTimeFrame, isSelected, handleTimeFrameClick }) => {
  const { reset } = useClear();
  useEffect(() => {
    if (reset > 0) {
      handleTimeFrameClick(""); // Llama a la función padre con valor vacío
    }
  }, [reset]);
  
  return (
    <div className="w-[30.4%] h-[21vh] bg-[#1E1E1E] rounded-[10px] flex flex-col items-center justify-center m-2 py-7 px-6">
      <div className="w-full h-full flex justify-between">
        <h3 className="blanco">Time Frame</h3>
        <input
          className={`rounded-[50px] border-[1px] ${
            isSelected ? "border-[#00E676]" : "border-[#333]"
          } fondo-alternativo-bg w-[23%] h-[59%] text-center text-white`}
          type="text"
          value={selectedTimeFrame}
          readOnly
        />
      </div>
      <div className="w-full h-full flex justify-between items-center">
        <h4 className="blanco w-[25%]">Select one</h4>
        <div className="w-[73%] h-[5%] rounded-[20px] gris-antracita-bg" />
      </div>
      <div className="w-full h-full flex flex-wrap justify-center items-center gap-x-3.5">
        <button onClick={() => handleTimeFrameClick("M1")}>
          <h4 className="blanco hover:bg-[#292929] hover:rounded-[5px] py-1 px-2">M1</h4>
        </button>
        <button onClick={() => handleTimeFrameClick("M5")}>
          <h4 className="blanco hover:bg-[#292929] hover:rounded-[5px] py-1 px-2">M5</h4>
        </button>
        <button onClick={() => handleTimeFrameClick("M15")}>
          <h4 className="blanco hover:bg-[#292929] hover:rounded-[5px] py-1 px-2">M15</h4>
        </button>
        <button onClick={() => handleTimeFrameClick("M30")}>
          <h4 className="blanco hover:bg-[#292929] hover:rounded-[5px] py-1 px-2">M30</h4>
        </button>
        <button onClick={() => handleTimeFrameClick("H1")}>
          <h4 className="blanco hover:bg-[#292929] hover:rounded-[5px] py-1 px-2">H1</h4>
        </button>
        <button onClick={() => handleTimeFrameClick("H4")}>
          <h4 className="blanco hover:bg-[#292929] hover:rounded-[5px] py-1 px-2">H4</h4>
        </button>
        <button onClick={() => handleTimeFrameClick("D1")}>
          <h4 className="blanco hover:bg-[#292929] hover:rounded-[5px] py-1 px-2">D1</h4>
        </button>
      </div>
    </div>
  );
};

export default TimeFrameSection;
