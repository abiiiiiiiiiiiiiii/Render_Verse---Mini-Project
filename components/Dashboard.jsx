import React, { useState, useEffect } from "react";
import "../index.css";
import logo from "../images/logo2.png";
import LessonPage from "./LessonPage";
import MayaInterface from "./MayaInterface";

const coursesData = {
  Maya: [
    "The Evolution of Animation",
    "Introduction to Animation",
    "Maya Interface",
    "Modelling I (Nurbs & Polygons)",
    "Modelling II (Environment & Sets)",
    "Basics of Lighting",
    "Lighting II",
    "Texturing I (Types & Basics)",
    "Texturing II (Advanced)",
    "Rigging I (Types & Basics)",
    "Rigging II (Advanced)",
    "Animation I (Camera)",
    "Animation II (Key Frames)",
    "Animation III (Full Model)",
    "Rendering (Final Output)",
  ],
  Blender: [
    "The Evolution of Animation",
    "Introduction to Animation",
    "Blender Interface",
    "Modelling I",
    "Modelling II (Environment & Sets)",
    "Basics of Lighting",
    "Lighting II",
    "Texturing I (Types & Basics)",
    "Texturing II (Advanced)",
    "Rigging I (Types & Basics)",
    "Rigging II (Advanced)",
    "Animation I (Camera)",
    "Animation II (Key Frames)",
    "Animation III (Full Model)",
    "Rendering (Final Output)",
  ],
  Unity: ["Unity Basics", "C# for Unity", "Game Physics", "Lighting & Shading"],
  Unreal: [
    "Intro to Unreal Engine",
    "Blueprint Scripting",
    "Level Design",
    "Rendering",
  ],
};

const Dashboard = ({ selectedSoftware }) => {
  const softwareCourses = coursesData[selectedSoftware] || [];
  const [completedLessons, setCompletedLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);

  useEffect(() => {
    const savedProgress =
      JSON.parse(localStorage.getItem(`${selectedSoftware}_progress`)) || [];
    setCompletedLessons(savedProgress);
  }, [selectedSoftware]);

  const resetProgress = () => {
    localStorage.removeItem(`${selectedSoftware}_progress`);
    setCompletedLessons([]);
    setCurrentLesson(null);
  };

  const handleLessonClick = (lesson) => {
    setCurrentLesson(lesson);
  };

  const handleBack = () => {
    setCurrentLesson(null); // Go back to Dashboard
  };

  // ✅ Function to mark lessons as completed and save progress
  const handleLessonComplete = () => {
    if (!completedLessons.includes(currentLesson)) {
      const updatedLessons = [...completedLessons, currentLesson];
      setCompletedLessons(updatedLessons);
      localStorage.setItem(`${selectedSoftware}_progress`, JSON.stringify(updatedLessons));
    }
    setCurrentLesson(null); // Return to Dashboard after completing the lesson
  };

  return (
    <div className="dashboard-container">
      {currentLesson ? (
        currentLesson === "Maya Interface" ? (
          // ✅ Pass `onComplete` to MayaInterface
          <MayaInterface onBack={handleBack} onComplete={handleLessonComplete} />
        ) : (
          // ✅ Pass `onComplete` to LessonPage
          <LessonPage lesson={currentLesson} onBack={handleBack} onComplete={handleLessonComplete} />
        )
      ) : (
        <>
          <img src={logo} alt="Logo" className="dashboard-logo" />
          <h2 className="dashboard-title">{selectedSoftware} Course🎓</h2>
          <button className="reset-button" onClick={resetProgress}>
            Reset Progress
          </button>
          <div className="course-list">
            {softwareCourses.map((lesson, index) => {
              const isCompleted = completedLessons.includes(lesson);
              const isUnlocked =
                index === 0 || completedLessons.includes(softwareCourses[index - 1]);

              return (
                <button
                  key={index}
                  className={`course-item ${
                    isCompleted ? "active" : isUnlocked ? "current" : "locked"
                  }`}
                  onClick={() => isUnlocked && handleLessonClick(lesson)}
                  disabled={!isUnlocked}
                >
                  {lesson} {isCompleted && <span className="progress">✅</span>}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
