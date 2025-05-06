import { useEffect, useState } from "react";
import { useClear } from "../ClearContext";

const EntrySection = ({ entry1, entry2, handleEntry1Change, handleEntry2Change }) => {
  const { reset } = useClear();
  const [input1Width, setInput1Width] = useState('100px');
  const [input2Width, setInput2Width] = useState('100px');
  const [input1Error, setInput1Error] = useState(false);
  const [input2Error, setInput2Error] = useState(false);

  const MAX_WIDTH = 200;
  const MIN_WIDTH = 100;
  const CHAR_WIDTH = 20;

  useEffect(() => {
    const displayValue = entry1 ? `$${formatNumberLatam(entry1)}` : "$";
    const width = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, displayValue.length * CHAR_WIDTH));
    setInput1Width(`${width}px`);
  }, [entry1]);

  useEffect(() => {
    const displayValue = entry2 ? `$${formatNumberLatam(entry2)}` : "$";
    const width = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, displayValue.length * CHAR_WIDTH));
    setInput2Width(`${width}px`);
  }, [entry2]);

  useEffect(() => {
    if (reset > 0) {
      handleEntry1Change({ target: { value: "" } });
      handleEntry2Change({ target: { value: "" } });
    }
  }, [reset]);

  const formatAndValidateInput = (value) => {
    // Verificar si hay letras
    if (/[a-zA-Z]/.test(value)) {
      return null;
    }
    // Reemplazar punto por nada (para miles) y coma por punto (para decimales)
    let cleanValue = value.replace(/\./g, '').replace(',', '.');
    // Eliminar todo excepto números y punto decimal
    cleanValue = cleanValue.replace(/[^\d.]/g, '');
    // Asegurar que solo haya un punto decimal
    const parts = cleanValue.split('.');
    if (parts.length > 2) {
        cleanValue = parts[0] + '.' + parts.slice(1).join('');
    }
    // Limitar a 2 decimales
    if (parts.length === 2 && parts[1].length > 2) {
        cleanValue = parts[0] + '.' + parts[1].slice(0, 2);
    }
    return cleanValue;
  };

  // Función para formatear el número al estilo latinoamericano
  const formatNumberLatam = (numStr) => {
    if (!numStr) return '';
    let [entero, decimal] = numStr.split('.');
    entero = entero.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return decimal !== undefined ? `${entero},${decimal}` : entero;
  };

  const handleInput1Change = (e) => {
    const formattedValue = formatAndValidateInput(e.target.value);
    setInput1Error(formattedValue === null);
    if (formattedValue !== null) {
      handleEntry1Change({ target: { value: formattedValue } });
      const displayValue = `$${formatNumberLatam(formattedValue)}`;
      const width = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, displayValue.length * CHAR_WIDTH));
      setInput1Width(`${width}px`);
    }
  };

  const handleInput2Change = (e) => {
    const formattedValue = formatAndValidateInput(e.target.value);
    setInput2Error(formattedValue === null);
    if (formattedValue !== null) {
      handleEntry2Change({ target: { value: formattedValue } });
      const displayValue = `$${formatNumberLatam(formattedValue)}`;
      const width = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, displayValue.length * CHAR_WIDTH));
      setInput2Width(`${width}px`);
    }
  };

  return (
    <div className="w-[30.4%] h-[21vh] flex flex-col items-center justify-between m-2">
      <div className="w-full h-[42%] flex bg-[#1E1E1E] rounded-[10px] items-center px-4 gap-1.5 relative">
        <h4 className="blanco w-[36%]">Potential entry 1</h4>
        <div className={`w-[40%] h-[1px] rounded-[20px] ${entry1 ? "verde-exito-bg" : "gris-antracita-bg"}`} />
        <div className="relative flex justify-end">
          <input
            className={`h-[32.4%] rounded-[50px] fondo-alternativo-bg border-[1px] transition-all duration-200 ${entry1 ? "border-[#00E676] text-end blanco" : "border-[#333] gris-antracita"} ${input1Error ? "border-red-500" : ""} flex justify-center h4 px-4`}
            style={{ width: input1Width }}
            type="text"
            value={entry1 ? `$${formatNumberLatam(entry1)}` : "$"}
            onChange={handleInput1Change}
            onPaste={(e) => {
              e.preventDefault();
              const pastedText = e.clipboardData.getData('text');
              const numericValue = pastedText.replace(/[^\d.]/g, '');
              if (numericValue) {
                handleInput1Change({ target: { value: numericValue } });
              }
            }}
          />
          {input1Error && (
            <div className="absolute bottom-full right-0 mb-2 px-3 py-2 rojo-alerta-bg blanco textos-peques rounded-[10px] whitespace-nowrap">
              Only numbers with a maximum of 2 decimal places are allowed
            </div>
          )}
        </div>
      </div>

      <div className="w-full h-[42%] flex bg-[#1E1E1E] rounded-[10px] items-center px-4 gap-1.5 relative">
        <h4 className="blanco w-[36%]">Potential entry 2</h4>
        <div className={`w-[38%] h-[1px] rounded-[20px] ${entry2 ? "verde-exito-bg" : "gris-antracita-bg"}`} />
        <div className="relative flex justify-end">
          <input
            className={`h-[32.4%] rounded-[50px] fondo-alternativo-bg border-[1px] transition-all duration-200 ${entry2 ? "border-[#00E676] text-end blanco" : "border-[#333] gris-antracita"} ${input2Error ? "border-red-500" : ""} flex justify-center h4 px-4`}
            style={{ width: input2Width }}
            type="text"
            value={entry2 ? `$${formatNumberLatam(entry2)}` : "$"}
            onChange={handleInput2Change}
            onPaste={(e) => {
              e.preventDefault();
              const pastedText = e.clipboardData.getData('text');
              const numericValue = pastedText.replace(/[^\d.]/g, '');
              if (numericValue) {
                handleInput2Change({ target: { value: numericValue } });
              }
            }}
          />
          {input2Error && (
            <div className="absolute bottom-full right-0 mb-2 px-3 py-2 rojo-alerta-bg blanco textos-peques rounded-[10px] whitespace-nowrap">
              Only numbers with a maximum of 2 decimal places are allowed
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntrySection;