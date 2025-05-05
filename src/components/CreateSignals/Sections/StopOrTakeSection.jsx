import { useEffect, useState } from "react";
import { useClear } from "../ClearContext";

const StopOrTakeSection = ({
  stop,
  take,
  handleStopChange,
  handleTakeChange,
  clearStopAndTake,
}) => {
  const { reset } = useClear();
  const [stopWidth, setStopWidth] = useState('103px');
  const [takeWidth, setTakeWidth] = useState('103px');

  const calculateWidth = (value) => {
    const baseWidth = 34; // Base width 
    const charWidth = 5; // Approximate width per character
    const maxWidth = 140; // Maximum width 

    const calculatedWidth = Math.min(
      baseWidth + (value.length * charWidth),
      maxWidth
    );

    return `${calculatedWidth}%`;
  };

  useEffect(() => {
    setStopWidth(calculateWidth(stop || ''));
  }, [stop]);

  useEffect(() => {
    setTakeWidth(calculateWidth(take || ''));
  }, [take]);

  useEffect(() => {
    if (reset > 0) {
      clearStopAndTake();
    }
  }, [reset]);

  return (
    <div className="w-[30.4%] h-[21vh] flex flex-col items-center justify-between m-2">
      <div className="w-full h-[42%] flex bg-[#1E1E1E] rounded-[10px] items-center px-4 gap-1.5">
        <h4 className="blanco w-[36%]">Stop loss</h4>
        <div className={`w-[96%] h-[1px] rounded-[20px] ${stop ? "verde-exito-bg" : "gris-antracita-bg"}`} />
        <input
          className={`h-[32.4%] rounded-[50px] fondo-alternativo-bg border-[1px] transition-all duration-200 ${
            stop ? "border-[#00E676] text-end blanco" : "border-[#333] gris-antracita"
          } flex justify-center h4 px-4`}
          style={{ width: stopWidth }}
          type="text"
          value={stop ? `$${stop}` : "$"}
          onChange={handleStopChange}
        />
      </div>

      <div className="w-full h-[42%] flex bg-[#1E1E1E] rounded-[10px] items-center px-4 gap-1.5">
        <h4 className="blanco w-[48%]">Take Profit</h4>
        <div className={`w-full h-[1px] rounded-[20px] ${take ? "verde-exito-bg" : "gris-antracita-bg"}`} />
        <input
          className={`h-[32.4%] rounded-[50px] fondo-alternativo-bg border-[1px] transition-all duration-200 ${
            take ? "border-[#00E676] text-end blanco" : "border-[#333] gris-antracita"
          } flex justify-center h4 px-4`}
          style={{ width: takeWidth }}
          type="text"
          value={take ? `$${take}` : "$"}
          onChange={handleTakeChange}
        />
      </div>
    </div>
  );
};

export default StopOrTakeSection;