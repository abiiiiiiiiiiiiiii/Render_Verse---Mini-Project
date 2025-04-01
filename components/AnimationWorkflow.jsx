import React, { useState, useEffect } from "react";
import "../index.css";
import completeGif from "../images/done.gif";
import pointsGif from "../images/diamond.gif";
import streakGif from "../images/confetti.gif";

const AnimationWorkflow = ({ onComplete, onBack }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [hearts, setHearts] = useState(5);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);

  useEffect(() => {
    const savedHearts = localStorage.getItem("hearts");
    setHearts(savedHearts ? parseInt(savedHearts, 10) : 5);
  }, []);

  useEffect(() => {
    if (hearts >= 0) {
      localStorage.setItem("hearts", hearts);
    }
  }, [hearts]);

  const pages = [
    "🎬 This module explores various techniques and the step-by-step process used in animation production.",
    "Animation workflow :-",
    "1. Pre-Production (Planning Stage) -",
    "   Storyboarding – Sketching key scenes.",
    "   Scriptwriting – Writing dialogue and actions.",
    "   Character & Environment Design – Creating concept art.",
    "   Designing the software and workflow.",
    "2. Production (Animation Stage) -",
    "   Modeling & Rigging (For 3D) – Creating character models and skeletons.",
    "   Animation – Applying motion using frame-by-frame, keyframes, or motion capture.",
    "   Lighting & Texturing – Adding colors, shadows, and details.",
    "3. Post-Production (Final Touches) -",
    "   Rendering – Converting animation into video format.",
    "   Compositing – Adding effects, backgrounds, and final adjustments.",
    "   Editing & Sound Design – Syncing animation with sound and music.",
    "Each step ensures the final animation is polished and engaging. By understanding different techniques and workflows, animators can choose the best approach for their projects! 🚀",
    "🎉 You've completed the lesson! Now, let's test your knowledge with a quiz!"
  ];

  const quizQuestions = [
    {
      question: "Which stage of the animation workflow involves sketching key scenes and writing the script?",
      options: [
        "Production",
        "Post-Production",
        "Pre-Production",
        "Rendering"
      ],
      correctAnswer: "Pre-Production"
    },
    {
      question: "What is the purpose of the Rendering process in animation?",
      options: ["Creating character models and skeletons", "Writing dialogue and actions", "Converting animation into a video format", "Adding effects and backgrounds"],
      correctAnswer: " Converting animation into a video format"
    }
  ];

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
      setHearts(5); // Reset hearts upon completion
      setLessonCompleted(true);
    } else {
      setHearts((prev) => Math.max(0, prev - 1)); // Deduct heart if wrong
    }
  };

  return (
    <div className="lesson-container">
      {/* HEADER */}
      <div className="lesson-header">
        <button className="back-button" onClick={onBack}>🔙 BACK</button>
        <div className="stats-container">
          <div className="hearts-container">
            <span className="hearts">
              {"❤️".repeat(hearts) + "🤍".repeat(5 - hearts)}
            </span>
          </div>
          <div className="stat-box">
            <img src={pointsGif} alt="Points" className="small-icon" /> 17
          </div>
          <div className="stat-box">
            <img src={streakGif} alt="Streak" className="small-icon" /> 24
          </div>
        </div>
      </div>

      {/* SCROLLABLE LESSON CONTENT */}
      {!showQuiz && !lessonCompleted && (
        <div className="scrollable-content">
          {pages.map((content, index) => (
            <p key={index} className="lesson-content">{content}</p>
          ))}
          <button className="start-quiz-button" onClick={() => setShowQuiz(true)}>
            Start Quiz
          </button>
        </div>
      )}

      {/* QUIZ SECTION */}
      {showQuiz && !lessonCompleted && (
        <div className="quiz-container">
          {quizQuestions.map((q, index) => (
            <div key={index} className="quiz-question">
              <p>{q.question}</p>
              {q.options.map((option) => (
                <button
                  key={option}
                  className={`quiz-option ${
                    selectedAnswers[index] === option ? "selected" : ""
                  }`}
                  onClick={() => handleQuizAnswer(index, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          ))}
          {hearts > 0 ? (
            <button className="submit-quiz-button" onClick={handleSubmitQuiz}>
              Submit Quiz
            </button>
          ) : (
            <p className="no-hearts">💔 You ran out of hearts! Restart the lesson.</p>
          )}
          {quizCompleted && (
            <p className="completed-message">🎉 Quiz Completed! Next module unlocked!</p>
          )}
        </div>
      )}

      {/* LESSON COMPLETED SCREEN */}
      {lessonCompleted && (
        <div className="completed-section">
          <img src={completeGif} alt="Lesson Completed" className="completed-gif" />
          <p className="completed-message">
            🎉 Congratulations! You've completed this lesson!
          </p>
          <button className="done-button" onClick={onComplete}>✅ DONE</button>
        </div>
      )}

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

export default AnimationWorkflow;