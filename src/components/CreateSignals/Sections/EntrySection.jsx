import { useEffect, useState } from "react";
import { useClear } from "../ClearContext";

const EntrySection = ({ entry1, entry2, handleEntry1Change, handleEntry2Change }) => {
  const { reset } = useClear();
  const [input1Width, setInput1Width] = useState('103px');
  const [input2Width, setInput2Width] = useState('103px');

  const calculateWidth = (value) => {
    const baseWidth = 24; // Base width in 
    const charWidth = 3; // Approximate width per character
    const maxWidth = 90; // Maximum width in 

    const calculatedWidth = Math.min(
      baseWidth + (value.length * charWidth),
      maxWidth
    );

    return `${calculatedWidth}%`;
  };

  useEffect(() => {
    setInput1Width(calculateWidth(entry1 || ''));
  }, [entry1]);

  useEffect(() => {
    setInput2Width(calculateWidth(entry2 || ''));
  }, [entry2]);

  useEffect(() => {
    if (reset > 0) {
      handleEntry1Change({ target: { value: "" } });
      handleEntry2Change({ target: { value: "" } });
    }
  }, [reset]);

  return (
    <div className="w-[30.4%] h-[21vh] flex flex-col items-center justify-between m-2">
      <div className="w-full h-[42%] flex bg-[#1E1E1E] rounded-[10px] items-center px-4 gap-1.5">
        <h4 className="blanco w-[36%]">Potential entry 1</h4>
        <div className={`w-[40%] h-[1px] rounded-[20px] ${entry1 ? "verde-exito-bg" : "gris-antracita-bg"}`} />
        <input
          className={`h-[32.4%] rounded-[50px] fondo-alternativo-bg border-[1px] transition-all duration-200 ${entry1 ? "border-[#00E676] text-end blanco" : "border-[#333] gris-antracita"
            } flex justify-center h4 px-4`}
          style={{ width: input1Width }}
          type="text"
          value={entry1 ? `$${entry1}` : "$"}
          onChange={handleEntry1Change}
        />
      </div>

      <div className="w-full h-[42%] flex bg-[#1E1E1E] rounded-[10px] items-center px-4 gap-1.5">
        <h4 className="blanco w-[36%]">Potential entry 2</h4>
        <div className={`w-[38%] h-[1px] rounded-[20px] ${entry2 ? "verde-exito-bg" : "gris-antracita-bg"}`} />
        <input
          className={`h-[32.4%] rounded-[50px] fondo-alternativo-bg border-[1px] transition-all duration-200 ${entry2 ? "border-[#00E676] text-end blanco" : "border-[#333] gris-antracita"
            } flex justify-center h4 px-4`}
          style={{ width: input2Width }}
          type="text"
          value={entry2 ? `$${entry2}` : "$"}
          onChange={handleEntry2Change}
        />
      </div>
    </div>
  );
};

export default EntrySection;