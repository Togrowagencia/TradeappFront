import GoogleTranslateSelect from "@google-translate-select/react";
import { allowedLanguages } from "../settings/allowedLanguages"; 

function Traductor() {
  return (
    <GoogleTranslateSelect
      languages={allowedLanguages}
      defaultLanguageCode="en" 
      fetchBrowserLanguage={false}
      className="google-translate-select"
      dropdownClassName="google-translate-select-dropdown__menu"
      showArrow={true}
    />
  );
}

export default Traductor;
