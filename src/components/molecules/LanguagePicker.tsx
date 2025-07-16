import { useEffect, useState } from "react";
import { getTranslatedPath } from "../../i18n/utils";

const LanguagePicker = ({ lang }) => {

  const [currentLang, setCurrentLang] = useState('');
  const [pathname, setPathname] = useState('');
  useEffect(() => {
    setCurrentLang(lang)
    setPathname(location.pathname);
  }, [lang]);

  const func = () => {
    const lang = currentLang === 'es' ? 'en' : 'es';
    const value = getTranslatedPath(
      pathname.replace(`/${currentLang}`, '').replace(/^\/+/, ''),
      lang
    );
    location.pathname = value;
  }

  return <button
    className="icon-button"
    onClick={func}
    aria-label={currentLang === 'es' ? 'Cambiar idioma' : 'Change language'}
  >
    {currentLang === 'es' ? 'EN' : 'ES'}
  </button>
};

export default LanguagePicker;