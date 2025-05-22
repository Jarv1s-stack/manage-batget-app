import { useLanguage } from "../context/LanguageContext";

const LanguageSelector = () => {
  const { language, setLanguage, currency, setCurrency } = useLanguage();

  return (
    <div className="language-selector">
      <select 
        value={language} 
        onChange={(e) => setLanguage(e.target.value)}
        className="language-dropdown"
      >
        <option value="en">English</option>
        <option value="ru">Русский</option>
        <option value="kk">Қазақша</option>
      </select>
      
      <select 
        value={currency} 
        onChange={(e) => setCurrency(e.target.value)}
        className="currency-dropdown"
      >
        <option value="USD">USD ($)</option>
        <option value="RUB">RUB (₽)</option>
        <option value="KZT">KZT (₸)</option>
        <option value="EUR">EUR (€)</option>
      </select>
    </div>
  );
};

export default LanguageSelector;