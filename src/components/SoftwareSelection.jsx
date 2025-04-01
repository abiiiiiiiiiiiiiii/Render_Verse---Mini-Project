import React, { useState } from "react";
import "../index.css";
import renderverseLogo from "../images/logo2.png";

const softwareOptions = ["Maya", "Blender", "Unity", "Unreal"];

const SoftwareSelection = ({ onNext }) => {
  const [selectedSoftware, setSelectedSoftware] = useState(null);

  return (
    <div className="language-container">
       <div className="sign-in-container">
          <img src={renderverseLogo} alt="Logo" className="renderverse-logo" />
          
          <h2 className="title">Choose Your Preferred Software</h2>

      <div className="language-list">
        {softwareOptions.map((software) => (
          <button
            key={software}
            className={`language-button ${selectedSoftware === software ? "selected" : ""}`}
            onClick={() => setSelectedSoftware(software)}
          >
            {software}
          </button>
        ))}
      </div>
      </div>
      <button className="done-button" onClick={() => onNext(selectedSoftware)} disabled={!selectedSoftware}>
        Done
      </button>
    </div>
  );
};

export default SoftwareSelection;
