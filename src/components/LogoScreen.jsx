import { useEffect } from "react";
import "../index.css"; // Import styles
import logo from "../images/name2.png"; // Correct way to import images
import heart from "../images/heart.png"; // Heart image for animation

const LogoScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 4000); // Show for 3 sec, then transition

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="logo-screen fade-in-out">
      <div className="heartbeat-container">
        <img src={heart} alt="Heartbeat" className="heartbeat" />
        <img src={logo} alt="RenderVerse" className="logo-overlay" />
      </div>
    </div>
  );
};

export default LogoScreen;
