import React, { useState, useEffect } from "react";
import "../index.css";
import streakGif from "../images/confetti.gif";
import pointsGif from "../images/diamond.gif";
import completeGif from "../images/done.gif";

import thaumatropeGif from "../images/thaumotrope.gif";
import flipbookGif from "../images/flipbook.gif";
import waltdisney from "../images/walt disney.gif";
import praxinoscope from "../images/praxinoscope.gif";
import flowers from "../images/flowers and trees.gif";
import avatar from "../images/avatar.gif";
import BnB from "../images/BnB.gif";
import cinderella from "../images/cindrella.gif";
import dalmatians from "../images/dalmations.gif";
import disney from "../images/disney.gif";
import snowwhite from "../images/dancing-snow-white.gif";
import encanto from "../images/encanto.gif";
import flinstone from "../images/flinstone.gif";
import insideout from "../images/insideo.gif";
import lionking from "../images/lion king.gif";
import nemo from "../images/nemo.gif";
import shrek from "../images/Shrek.gif";
import spiderman from "../images/spiderverse.gif";
import io2 from "../images/anxiety.gif";
import funnyfacesGif from "../images/funnyfaces.gif";
import fantom from "../images/fantom.gif";
import toystory from "../images/toystory.gif";
import pixar from "../images/Pixar.gif";
import last from "../images/last.gif";


import lockIcon from "../images/lockk.gif";
import checkIcon from "../images/done.jpg";
import IntroductionToAnimationLesson from "./IntroductionToAnimationLesson";
import TypesOfAnimation from "./TypesOfAnimation";
import PrinciplesOfAnimation from "./PrinciplesOfAnimation";
import AnimationTechniques from "./AnimationTechniques";
import AnimationWorkflow from "./AnimationWorkflow";
import ToolsForAnimation from "./ToolsForAnimation";
import MayaInterface from "./MayaInterface";

const timelineData = [
  { text: "Early 1800s: The term 'animation' began taking shape, with inventions like the Thaumatrope, Phenakistoscope, and Zoetrope.", gif: thaumatropeGif },
  { text: "1868: The Flip Book was introduced and patented by John Barnes Linnet.", gif: flipbookGif },
  { text: "1877: Émile Reynaud created the Praxinoscope, an early animation projector.", gif: praxinoscope},
  { text: "1892: Reynaud presented the first animated film, 'Pantomimes Lumineuses'.", gif: fantom },
  { text: "1906: 'Humorous Phases of Funny Faces' became the first animated short.", gif: funnyfacesGif },
  { text: "1923: Walt Disney founded Disney Brothers Studio (later Walt Disney Studios).", gif: waltdisney },
  { text: "1932: Disney’s 'Flowers and Trees' became the first animated film in full Technicolor.", gif: flowers},
  { text: "1937: Disney’s 'Snow White and the Seven Dwarfs' became the first full-length animated feature film.", gif: snowwhite },
  { text: "1950: Disney’s 'Cinderella' marked a comeback after World War II.", gif: cinderella },
  { text: "1960: 'The Flintstones' became the first prime-time animated TV show.", gif: flinstone },
  { text: "1961: Disney’s '101 Dalmatians' pioneered the Xerox technique, streamlining animation.", gif: dalmatians },
  { text: "1986: Disney partnered with Pixar, beginning the CGI revolution.", gif: pixar },
  { text: "1991: 'Beauty and the Beast' became the first animated film nominated for Best Picture at the Oscars.", gif: BnB },
  { text: "1994: Disney’s 'The Lion King' became a global hit, redefining hand-drawn animation.", gif: lionking },
  { text: "1995: 'Toy Story' (Pixar & Disney) became the first fully 3D CGI-animated feature film.", gif: toystory },
  { text: "2001: 'Shrek' won the first-ever Academy Award for Best Animated Feature.", gif: shrek },
  { text: "2003: 'Finding Nemo' (Pixar) became the first Pixar film to win an Oscar.", gif: nemo },
  { text: "2006: Disney acquired Pixar, strengthening its role in CGI animation.", gif: disney },
  { text: "2009: 'Avatar' (James Cameron) pushed motion capture animation to new heights.", gif: avatar },
  { text: "2015: 'Inside Out' (Pixar) introduced emotion-based storytelling and AI-driven animation.", gif: insideout },
  { text: "2018: 'Spider-Man: Into the Spider-Verse' brought comic book-style animation to life.", gif: spiderman },
  { text: "2021: 'Encanto' (Disney) introduced procedural animation for character movements.", gif: encanto },
  { text: "2024: 'Inside Out 2' (Pixar) became the highest-grossing animated film in history, earning over $1.63 billion worldwide.", gif: io2 },
  { text: "The history of animation continues to evolve!", gif: last }
];


const introModules = [
  "Introduction to Animation",
  "Types of Animation",
  "Principles of Animation",
  "Animation Techniques",
  "Animation Workflow",
  "Tools & Software for Animation",
];

const LessonPage = ({ lesson, onComplete, onBack }) => {
  const [completed, setCompleted] = useState(false);
  const [currentModule, setCurrentModule] = useState(null);
  const [completedModules, setCompletedModules] = useState([]);
  const [hearts, setHearts] = useState(5);

  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem("intro_animation_progress")) || [];
    setCompletedModules(savedProgress);

    const isEvolutionCompleted = localStorage.getItem("evolution_animation_completed") === "true";
    setCompleted(isEvolutionCompleted);

    // Unlock "Introduction to Animation" if "The Evolution of Animation" is completed
    if (isEvolutionCompleted && !savedProgress.includes("Introduction to Animation")) {
      const updatedProgress = ["Introduction to Animation", ...savedProgress];
      setCompletedModules(updatedProgress);
      localStorage.setItem("intro_animation_progress", JSON.stringify(updatedProgress));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("intro_animation_progress", JSON.stringify(completedModules));
  }, [completedModules]);

  const handleModuleClick = (module) => {
    const moduleIndex = introModules.indexOf(module);
    const isUnlocked = completedModules.includes(module) || completedModules.length === moduleIndex;

    if (isUnlocked) {
      setCurrentModule(module);
    }
  };

  const handleComplete = () => {
    if (currentModule && !completedModules.includes(currentModule)) {
      const updatedModules = [...completedModules, currentModule];

      const currentIndex = introModules.indexOf(currentModule);
      if (currentIndex < introModules.length - 1) {
        const nextModule = introModules[currentIndex + 1];
        updatedModules.push(nextModule);
      }

      setCompletedModules(updatedModules);

      if (updatedModules.length >= introModules.length) {
        setCompleted(true);
        if (typeof onComplete === "function") {
          onComplete();
        } else {
          console.error("onComplete is not a valid function");
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 1000);
        }
      }
    }
    setCurrentModule(null);
  };

  const handleWrongAnswer = () => {
    if (hearts > 0) {
      setHearts(hearts - 1);
    }
  };

  const goBack = () => {
    if (currentModule) {
      setCurrentModule(null);
    } else {
      onBack();
    }
  };

  const resetProgress = () => {
    localStorage.removeItem("evolution_animation_completed");
    localStorage.removeItem("intro_animation_progress");
    setCompleted(false);
    setCompletedModules([]);
    alert("Progress reset! Refresh to start over.");
  };

  
  

  return (
    <div className="lesson-container" style={{ height: "180vh" }}>
      <div className="lesson-header-container">
        <div className="lesson-header">
          <button className="back-button" onClick={goBack}>🔙 BACK</button>
          <div className="stats-container">
            <div className="hearts-container">
              <span className="hearts">{"❤️".repeat(hearts) + "🤍".repeat(5 - hearts)}</span>
            </div>
            <div className="stat-box">
              <img src={pointsGif} alt="Points" className="small-icon" /> 50
            </div>
            <div className="stat-box">
              <img src={streakGif} alt="Streak" className="small-icon" /> 1
            </div>
          </div>
        </div>
      </div>
  
      <div>
        <button onClick={resetProgress}>🔄 Reset Progress</button>
      </div>
  
      <div className="title-container">
        <h2 className="lesson-title">{lesson}</h2>
      </div>
  
      {/* Timeline for "The Evolution of Animation" */}
      {lesson === "The Evolution of Animation" && (
        <div className="timeline-container">
          <div className="timeline-line"></div>
          {timelineData.map((event, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-extension"></div>
              <div className="timeline-content">
                <p>{event.text}</p>
                <div className="timeline-gif">
                  <img src={event.gif} alt="event gif" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
  
      {/* Modules for "Introduction to Animation" */}
      {lesson === "Introduction to Animation" && !currentModule && (
        <div className="module-container">
          {introModules.map((module, index) => {
            const isUnlocked = completedModules.includes(module) || completedModules.length === index;
            return (
              <button
                key={index}
                className={`module-button ${isUnlocked ? "unlocked" : "locked"}`}
                onClick={() => isUnlocked && handleModuleClick(module)}
                disabled={!isUnlocked}
              >
                {module}
                <img
                  src={isUnlocked ? (completedModules.includes(module) ? checkIcon : null) : lockIcon}
                  alt="icon"
                  className="module-icon"
                />
              </button>
            );
          })}
        </div>
      )}
  
      {/* Lesson Content Rendering */}
      {currentModule && (
        <div className="module-content">
          {currentModule === "Introduction to Animation" && <IntroductionToAnimationLesson onComplete={handleComplete} onWrongAnswer={handleWrongAnswer} />}
          {currentModule === "Types of Animation" && <TypesOfAnimation onComplete={handleComplete} onWrongAnswer={handleWrongAnswer} />}
          {currentModule === "Principles of Animation" && <PrinciplesOfAnimation onComplete={handleComplete} onWrongAnswer={handleWrongAnswer} />}
          {currentModule === "Animation Techniques" && <AnimationTechniques onComplete={handleComplete} onWrongAnswer={handleWrongAnswer} />}
          {currentModule === "Animation Workflow" && <AnimationWorkflow onComplete={handleComplete} onWrongAnswer={handleWrongAnswer} />}
          {currentModule === "Tools & Software for Animation" && <ToolsForAnimation onComplete={handleComplete} onWrongAnswer={handleWrongAnswer} />}
          {currentModule === "Maya Interface" && <MayaInterface onComplete={handleComplete} />}
        </div>
      )}

      
  
      {/* Complete Lesson Button */}
      {lesson !== "The Evolution of Animation" && !completed && (
        <button className="complete-button" onClick={handleComplete}>
          <img src={completeGif} alt="Complete" className="button-icon" /> Complete Lesson
        </button>
      )}
  
      {lesson === "The Evolution of Animation" && !completed && (
        <button className="complete-button" onClick={() => {
          setCompleted(true);
          localStorage.setItem("evolution_animation_completed", "true");
          onComplete();
        }}>
          <img src={completeGif} alt="Complete" className="button-icon" /> Complete Lesson
        </button>
      )}
  
      {completed && <p className="completed-message">🎉 Course Completed!</p>}
    
  
  


      <div className="footer-nav">
        <button onClick={goBack}><span className="footer-icon">🔙</span> Back</button>
      </div>
    </div>
  );
};

export default LessonPage;
