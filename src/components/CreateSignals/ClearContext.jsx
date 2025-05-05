// ClearContext.jsx
import { createContext, useContext, useState } from 'react';

const ClearContext = createContext();

// Exportar el Provider como named export
export const ClearProvider = ({ children }) => {
  const [reset, setReset] = useState(0);
  
  const clearAll = () => {
    setReset(prev => prev + 1);
  };

  return (
    <ClearContext.Provider value={{ reset, clearAll }}>
      {children}
    </ClearContext.Provider>
  );
};

// Exportar el hook personalizado
export const useClear = () => {
  const context = useContext(ClearContext);
  if (!context) {
    throw new Error('useClear debe usarse dentro de un ClearProvider');
  }
  return context;
};