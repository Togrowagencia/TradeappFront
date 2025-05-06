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
  const [stopWidth, setStopWidth] = useState('100px');
  const [takeWidth, setTakeWidth] = useState('100px');
  const [stopError, setStopError] = useState(false);
  const [takeError, setTakeError] = useState(false);

  const MAX_WIDTH = 200;
  const MIN_WIDTH = 100;
  const CHAR_WIDTH = 20;

  useEffect(() => {
    const displayValue = stop ? `$${formatNumberLatam(stop)}` : "$";
    const width = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, displayValue.length * CHAR_WIDTH));
    setStopWidth(`${width}px`);
  }, [stop]);

  useEffect(() => {
    const displayValue = take ? `$${formatNumberLatam(take)}` : "$";
    const width = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, displayValue.length * CHAR_WIDTH));
    setTakeWidth(`${width}px`);
  }, [take]);

  useEffect(() => {
    if (reset > 0) {
      clearStopAndTake();
    }
  }, [reset]);

  const formatNumberLatam = (numStr) => {
    if (!numStr) return '';
    let [entero, decimal] = numStr.split('.');
    entero = entero.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return decimal !== undefined ? `${entero},${decimal}` : entero;
  };

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

  const handleLocalStopChange = (e) => {
    const formattedValue = formatAndValidateInput(e.target.value);
    setStopError(formattedValue === null);
    if (formattedValue !== null) {
      handleStopChange({ target: { value: formattedValue } });
      const displayValue = `$${formatNumberLatam(formattedValue)}`;
      const width = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, displayValue.length * CHAR_WIDTH));
      setStopWidth(`${width}px`);
    }
  };

  const handleLocalTakeChange = (e) => {
    const formattedValue = formatAndValidateInput(e.target.value);
    setTakeError(formattedValue === null);
    if (formattedValue !== null) {
      handleTakeChange({ target: { value: formattedValue } });
      const displayValue = `$${formatNumberLatam(formattedValue)}`;
      const width = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, displayValue.length * CHAR_WIDTH));
      setTakeWidth(`${width}px`);
    }
  };

  return (
    <div className="w-[30.4%] h-[21vh] flex flex-col items-center justify-between m-2">
      <div className="w-full h-[42%] flex bg-[#1E1E1E] rounded-[10px] items-center px-4 gap-1.5 relative">
        <h4 className="blanco w-[36%]">Stop loss</h4>
        <div className={`w-[96%] h-[1px] rounded-[20px] ${stop ? "verde-exito-bg" : "gris-antracita-bg"}`} />
        <div className="relative flex justify-end">
          <input
            className={`h-[32.4%] rounded-[50px] fondo-alternativo-bg border-[1px] transition-all duration-200 ${
              stop ? "border-[#00E676] text-end blanco" : "border-[#333] gris-antracita"
            } ${stopError ? "border-red-500" : ""} flex justify-center h4 px-4`}
            style={{ width: stopWidth }}
            type="text"
            value={stop ? `$${formatNumberLatam(stop)}` : "$"}
            onChange={handleLocalStopChange}
            onPaste={(e) => {
              e.preventDefault();
              const pastedText = e.clipboardData.getData('text');
              const numericValue = pastedText.replace(/[^\d.]/g, '');
              if (numericValue) {
                handleLocalStopChange({ target: { value: numericValue } });
              }
            }}
          />
          {stopError && (
            <div className="absolute bottom-full right-0 mb-2 px-3 py-2 rojo-alerta-bg blanco textos-peques rounded-[10px] whitespace-nowrap">
              Only numbers with a maximum of 2 decimal places are allowed
            </div>
          )}
        </div>
      </div>

      <div className="w-full h-[42%] flex bg-[#1E1E1E] rounded-[10px] items-center px-4 gap-1.5 relative">
        <h4 className="blanco w-[48%]">Take Profit</h4>
        <div className={`w-full h-[1px] rounded-[20px] ${take ? "verde-exito-bg" : "gris-antracita-bg"}`} />
        <div className="relative flex justify-end">
          <input
            className={`h-[32.4%] rounded-[50px] fondo-alternativo-bg border-[1px] transition-all duration-200 ${
              take ? "border-[#00E676] text-end blanco" : "border-[#333] gris-antracita"
            } ${takeError ? "border-red-500" : ""} flex justify-center h4 px-4`}
            style={{ width: takeWidth }}
            type="text"
            value={take ? `$${formatNumberLatam(take)}` : "$"}
            onChange={handleLocalTakeChange}
            onPaste={(e) => {
              e.preventDefault();
              const pastedText = e.clipboardData.getData('text');
              const numericValue = pastedText.replace(/[^\d.]/g, '');
              if (numericValue) {
                handleLocalTakeChange({ target: { value: numericValue } });
              }
            }}
          />
          {takeError && (
            <div className="absolute bottom-full right-0 mb-2 px-3 py-2 rojo-alerta-bg blanco textos-peques rounded-[10px] whitespace-nowrap">
              Only numbers with a maximum of 2 decimal places are allowed
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StopOrTakeSection;