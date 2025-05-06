import React, { useState } from "react";

const SymbolSection = ({ selectedSymbol, setSelectedSymbol, symbols = [], loading }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelect = (symbol, image) => {
    const newSymbol = { symbol, image };
    setSelectedSymbol(newSymbol);
    setIsDropdownOpen(false);
  };

  if (loading) {
    return (
      <div className="w-[30.4%] h-[21vh] bg-[#1E1E1E] rounded-[10px] flex flex-col items-center justify-center m-2 pt-7 pb-2 px-6 relative">
        <div className="w-full h-full flex justify-between items-center">
          <h3 className="blanco loading-symbols"></h3>
        </div>
      </div>
    );
  }

  console.log('Símbolos recibidos en SymbolSection:', symbols);

  // Filtrar los símbolos más usados
  const mostUsedSymbols = symbols.filter(symbol => symbol.isMostUsed);

  return (
    <div className="w-[30.4%] h-[21vh] bg-[#1E1E1E] rounded-[10px] flex flex-col items-center justify-center m-2 pt-7 pb-2 px-6 relative">
      <div className="w-full h-full flex justify-between items-center">
        <h3 className="blanco">Select Symbol</h3>
        <div
          className={`rounded-[50px] border-[1px] fondo-alternativo-bg w-auto lpm:w-[55%] h-auto min-h-[65%] min-w-[25%] px-2 py-1 text-center cursor-pointer flex items-center justify-center ${selectedSymbol ? "border-[#00E676]" : "border-[#333]"
            }`}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {selectedSymbol ? (
            <div className="flex items-center gap-2 lpm:gap-1.5">
              <img src={selectedSymbol.image} alt={selectedSymbol.symbol} className="w-7.5 h-4" />
              <span className="textos blanco">{selectedSymbol.symbol}</span>
              <img src="\svg\CreateSignals\selectv.svg" alt="" />
            </div>
          ) : (
            <span className="flex justify-end w-full px-1">
              <img src="\svg\CreateSignals\selectg.svg" alt="" className="" />
            </span>
          )}
        </div>
      </div>

      {isDropdownOpen && (
        <div className="absolute top-[7vh] right-6 w-auto fondo-bg rounded-[10px] shadow-lg max-h-[200px] overflow-y-auto z-10">
          {symbols && symbols.length > 0 ? (
            symbols.map(({ symbol, image }) => (
              <div
                key={`${symbol}-${image}`}
                className="flex items-center gap-2 p-2 hover:bg-[#fff] cursor-pointer textos blanco hover:text-black"
                onClick={() => handleSelect(symbol, image)}
              >
                <img src={image} alt={symbol} className="w-7.5 h-4" />
                <span className="textos negro">{symbol}</span>
              </div>
            ))
          ) : (
            <div className="p-2 textos blanco">There are no symbols available</div>
          )}
        </div>
      )}

      <div className="w-full h-full flex justify-between items-center mt-2">
        <h4 className="blanco w-[25%]">Most used</h4>
        <div className="w-[73%] h-[5%] rounded-[20px] gris-antracita-bg" />
      </div>

      <div className="w-full flex flex-wrap gap-x-4 gap-y-1 items-center justify-center">
        {mostUsedSymbols && mostUsedSymbols.length > 0 ? (
          mostUsedSymbols.map(({ symbol, image }, index) => (
            <div
              key={index}
              className="flex items-center justify-center gap-2 cursor-pointer hover:bg-[#292929] hover:rounded-[5px] p-2"
              onClick={() => handleSelect(symbol, image)}
            >
              <img src={image} alt={symbol} className="w-7.5 h-4" />
              <span className="textos blanco">{symbol}</span>
            </div>
          ))
        ) : (
          <div className="p-2 textos blanco">There are no symbols available</div>
        )}
      </div>
    </div>
  );
};

export default SymbolSection;