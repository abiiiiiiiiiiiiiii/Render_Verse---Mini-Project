import React, { useState } from "react";
import "../index.css";
import renderverseLogo from "../images/logo2.png";

const languages = ["English", "தமிழ்"];

const LanguageSelection = ({ onNext }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  return (
    <div className="language-container">
    <div className="sign-in-container">
          <img src={renderverseLogo} alt="Logo" className="renderverse-logo" />
      
      <h2 className="title">Choose Your Preferred Language</h2>

      <div className="language-list">
        {languages.map((lang) => (
          <button
            key={lang}
            className={`language-button ${selectedLanguage === lang ? "selected" : ""}`}
            onClick={() => setSelectedLanguage(lang)}
          >
            {lang}
          </button>
        ))}
      </div>

      <button className="done-button" onClick={() => onNext(selectedLanguage)} disabled={!selectedLanguage}>
        Done
      </button>
    </div>
    </div>
  );
};

export default LanguageSelection;
