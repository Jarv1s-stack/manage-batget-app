import { useLanguage } from "../context/LanguageContext";

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

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
    </div>
  );
};

export default LanguageSelector;