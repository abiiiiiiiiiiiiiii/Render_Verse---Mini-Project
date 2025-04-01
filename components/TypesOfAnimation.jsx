import React, { useState, useEffect } from "react";
import "../index.css";
import completeGif from "../images/done.gif";
import pointsGif from "../images/diamond.gif";
import streakGif from "../images/confetti.gif";

const TypesOfAnimation = ({ onComplete, onBack }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [hearts, setHearts] = useState(5);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);

  useEffect(() => {
    const savedHearts = localStorage.getItem("hearts");
    if (savedHearts) {
      setHearts(parseInt(savedHearts, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("hearts", hearts);
  }, [hearts]);

  const pages = [
    "Animation is the process of creating motion by displaying a sequence of images, known as frames, in rapid succession. Different animation techniques bring stories, characters, and objects to life in unique ways.",
    "2.1 Traditional (Hand-Drawn) Animation -",
    "Definition: A frame-by-frame technique where each drawing is created by hand.",
    "Originally drawn on paper or transparent cels and photographed.",
    "Used in classic Disney movies (Snow White, The Lion King).",
    "Offers a rich, artistic feel but is time-consuming.",
    "2.2 Stop Motion Animation -",
    "Definition: A technique where physical objects are photographed frame by frame and slightly moved between shots to create motion.",
    "Types include Claymation (Wallace & Gromit), Cutout Animation (South Park), and Puppet Animation (The Nightmare Before Christmas).",
    "Requires patience but creates unique, tangible visuals.",
    "2.3 2D Digital Animation -",
    "Definition: A modern version of traditional animation, created using digital tools instead of paper.",
    "Uses software like Adobe Animate and Toon Boom.",
    "More efficient than hand-drawn animation.",
    "Common in modern cartoons and explainer videos.",
    "2.4 3D Animation -",
    "Definition: A technique where characters and environments are designed in three-dimensional space using computer software.",
    "Found in movies (Toy Story), video games, and VR.",
    "Requires software like Blender, Maya, or Cinema 4D.",
    "2.5 Motion Graphics -",
    "Definition: Animation focused on moving text, shapes, and graphics rather than characters or storytelling.",
    "Used in advertising, marketing, and presentations.",
    "Created with tools like Adobe After Effects.",
    "Each type of animation has its strengths, making it suitable for different purposes, from entertainment to education and marketing. 🚀",
    "🎉 You've completed the lesson! Now, let's test your knowledge with a quiz!"
  ];

  const quizQuestions = [
    {
      question: "Which animation technique involves drawing each frame by hand and was used in classic Disney movies?",
      options: [
        "3D Animation",
        "Motion Graphics",
        "Traditional (Hand-Drawn) Animation",
        "Stop Motion Animation"
      ],
      correctAnswer: "Traditional (Hand-Drawn) Animation"
    },
    {
      question: "Which type of animation is commonly used in advertising and marketing, focusing on moving text and graphics?",
      options: ["3D Animation", "Motion Graphics", "Stop Motion Animation", "2D Digital Animation"],
      correctAnswer: "Motion Graphics"
    },
    {
      question: "Which animation technique involves capturing real-world objects frame by frame and moving them slightly to create motion?",
      options: ["Traditional (Hand-Drawn) Animation", "Stop Motion Animation", "2D Digital Animation", "Motion Graphics"],
      correctAnswer: "Stop Motion Animation"
    }
  ];

  const handleQuizAnswer = (questionIndex, answer) => {
    setSelectedAnswers({ ...selectedAnswers, [questionIndex]: answer });
  };

  const handleSubmitQuiz = () => {
    const allCorrect = quizQuestions.every(
      (q, index) => selectedAnswers[index] === q.correctAnswer
    );

    if (allCorrect) {
      setQuizCompleted(true);
      setHearts(5); // Reset hearts upon completion
      localStorage.setItem("hearts", 5);
      setLessonCompleted(true);
    } else {
      setHearts((prev) => Math.max(0, prev - 1)); // Deduct heart if wrong
    }
  };

  return (
    <div className="lesson-container">
      {/* HEADER */}
      <div className="lesson-header">
     
        <div className="stats-container">
          <div className="hearts-container">
            <span className="hearts">
              {"❤️".repeat(hearts) + "🤍".repeat(5 - hearts)}
            </span>
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

      
    </div>
  );
};

export default TypesOfAnimation;