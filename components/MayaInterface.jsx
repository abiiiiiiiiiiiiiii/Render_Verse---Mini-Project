import React, { useState, useEffect, useRef } from "react";
import "../index.css";
import completeGif from "../images/done.gif";
import pointsGif from "../images/diamond.gif";
import streakGif from "../images/confetti.gif";

const MayaInterface = ({ onComplete, onBack }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [hearts, setHearts] = useState(5);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const savedHearts = localStorage.getItem("hearts");
    if (savedHearts) {
      setHearts(parseInt(savedHearts, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("hearts", hearts);
  }, [hearts]);

  const handleSpeedChange = (speed) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const handleQuizAnswer = (questionIndex, answer) => {
    setSelectedAnswers({ ...selectedAnswers, [questionIndex]: answer });
  };

  const handleSubmitQuiz = () => {
    if (Object.keys(selectedAnswers).length < quizQuestions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    const allCorrect = quizQuestions.every(
      (q, index) => selectedAnswers[index] === q.correctAnswer
    );

    if (allCorrect) {
      setQuizCompleted(true);
      setHearts(5);
      setLessonCompleted(true);
    } else {
      setHearts((prev) => Math.max(0, prev - 1));
    }
  };

  const handleLessonComplete = () => {
    const progressKey = "intro_animation_progress";
    const savedProgress = JSON.parse(localStorage.getItem(progressKey)) || [];
    if (!savedProgress.includes("Maya Interface")) {
      const updatedProgress = [...savedProgress, "Maya Interface"];
      localStorage.setItem(progressKey, JSON.stringify(updatedProgress));
    }
    onComplete();
  };

  const transcript = [
    "INTRODUCTION TO MAYA'S INTERFACE -",
    "Hi there! It’s great to see you taking the first step in your learning journey today. Let's begin by exploring the interface of Autodesk Maya. Understanding the workspace is essential for a smooth workflow, so let’s go over the key components.",
    "1. Menu Sets – This is where you'll find all the tools you need. The menu changes based on the task you're working on, whether it’s modeling, animation, or rendering.",
    "2. Shelves – These provide quick access to commonly used tools, including objects, NURBS, and polygons, allowing you to work efficiently.",
    "3. Outliner – This panel lists all the elements in your scene, making it easier to organize and access your models.",
    "4. Timeline – Used to set keyframes and create animations by defining movement and transformations over time.",
    "5. Editor Panel – Contains attributes and settings for selected objects, allowing you to modify their properties in detail.",
    "6. Workspace – The main area where you interact with your project, customize your layout, and streamline your workflow.",
    "7. Toolbox – Houses frequently used tools, helping you switch between functions quickly.",
    "8. Viewports – This is where the actual modeling and animation take place. You can press the Tab key to switch between different viewport layouts. By default, you have four views: Front, Side, Top, and Perspective, each offering a unique way to visualize your scene.",
    "Now, let’s quickly recap: We explored the key components of Maya’s interface, each playing a crucial role in your workflow. In the upcoming lessons, we’ll dive deeper into each of these elements and learn how to use them effectively.",
    "That’s it for now! Get ready to explore Maya further in the next lesson. See you there!"
  ];

  const quizQuestions = [
    {
      question: "What is the primary purpose of the Outliner in Maya?",
      options: [
        "Edit materials",
        "Hierarchical view of objects in the scene",
        "Model objects",
        "Play animations",
      ],
      correctAnswer: "Hierarchical view of objects in the scene",
    },
    {
      question: "Which section lets you scrub through animation frames?",
      options: ["Viewport", "Toolbar", "Timeline", "Attribute Editor"],
      correctAnswer: "Timeline",
    },
  ];

  return (
    <div className="lesson-container">
      <div className="lesson-header">
        <button className="back-button" onClick={onBack}>🔙 BACK</button>
        <div className="stats-container">
          <div className="hearts-container">
            <span className="hearts">{"❤️".repeat(hearts) + "🤍".repeat(5 - hearts)}</span>
          </div>
          <div className="stat-box">
            <img src={pointsGif} alt="Points" className="small-icon" /> 17
          </div>
          <div className="stat-box">
            <img src={streakGif} alt="Streak" className="small-icon" /> 24
          </div>
        </div>
      </div>

      {!showQuiz && !lessonCompleted && (
        <div className="video-container">
          <h2 className="lesson-title">Introduction to Maya Interface</h2>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/MLFoHLfkKWY?si=cOch4c5MCplAQd4s" 
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {!showQuiz && !lessonCompleted && (
        <div className="transcript-container">
          <h3>Video Transcript</h3>
          {transcript.map((line, index) => (
            <p key={index} className="transcript-text">{line}</p>
          ))}
          <button className="start-quiz-button" onClick={() => setShowQuiz(true)}>
            Start Quiz
          </button>
        </div>
      )}

      {showQuiz && !lessonCompleted && (
        <div className="quiz-container">
          {quizQuestions.map((q, index) => (
            <div key={index} className="quiz-question">
              <p>{q.question}</p>
              {q.options.map((option) => (
                <button
                  key={option}
                  className={`quiz-option ${selectedAnswers[index] === option ? "selected" : ""}`}
                  onClick={() => handleQuizAnswer(index, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          ))}
          <button className="submit-quiz-button" onClick={handleSubmitQuiz}>
            Submit Quiz
          </button>
        </div>
      )}

      {lessonCompleted && (
        <div className="completed-section">
          <img src={completeGif} alt="Lesson Completed" className="completed-gif" />
          <p className="completed-message">🎉 Congratulations! You've completed this lesson!</p>
          <button className="complete-lesson-button" onClick={handleLessonComplete}>Complete Lesson</button>
        </div>
      )}
      {/* Footer Navigation */}
      <div className="footer-nav">
        <button onClick={onBack}><span className="footer-icon">🔙</span> Back</button>
        <button><span className="footer-icon">👤</span> Profile</button>
        <button><span className="footer-icon">🏆</span> Leaderboard</button>
        <button><span className="footer-icon">📚</span> Courses</button>
        <button><span className="footer-icon">🎯</span> Goals</button>
      </div>
    </div>

    
  );
};

export default MayaInterface;
