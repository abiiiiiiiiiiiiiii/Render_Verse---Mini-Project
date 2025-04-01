import React, { useEffect, useState } from "react";
import "../index.css";
import loadingGif from "../images/loading.mp4";

const LoadingPage = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const loadingSteps = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < loadingSteps) return prev + 1;
        clearInterval(interval);
        setTimeout(onComplete, 4500);
        return prev;
      });
    }, 600);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="loading-container">
      {/* 🔹 Background Video */}
      <video autoPlay loop muted className="bg-video">
        <source src={loadingGif} type="video/mp4" />
      </video>
      <div className="video-overlay"></div>
      {/* 🔹 Loading Elements */}
      <div className="loading-content">
        <div className="loading-strips">
          {[...Array(loadingSteps)].map((_, i) => (
            <div key={i} className={`strip ${i < progress ? "filled" : ""}`}></div>
          ))}
        </div>
        <p className="loading-text">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
