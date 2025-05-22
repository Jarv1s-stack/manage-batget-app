import { useLanguage } from "../context/LanguageContext";
import en from "../translations/en";
import ru from "../translations/ru";
import kk from "../translations/kk";

const translations = { en, ru, kk };

export const useTranslation = () => {
  const { language } = useLanguage();
  
  return (key) => {
    const keys = key.split('.');
    let result = translations[language];
    
    for (const k of keys) {
      if (!result) break;
      result = result[k];
    }
    
    return result || translations.en[key] || key;
  };
};