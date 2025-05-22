import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
  const [currency, setCurrency] = useState(localStorage.getItem('currency') || 'USD');

  const updateLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const updateCurrency = (curr) => {
    setCurrency(curr);
    localStorage.setItem('currency', curr);
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: updateLanguage, 
      currency, 
      setCurrency: updateCurrency 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);