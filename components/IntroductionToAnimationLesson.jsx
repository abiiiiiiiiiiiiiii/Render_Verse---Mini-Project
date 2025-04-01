import React, { useState, useEffect } from "react";
import "../index.css";
import completeGif from "../images/done.gif";
import pointsGif from "../images/diamond.gif";
import streakGif from "../images/confetti.gif";

const IntroductionToAnimationLesson = ({ onComplete, onBack }) => {
  const [hearts, setHearts] = useState(5);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
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
    "🎬 Welcome to Animation! Animation is the illusion of movement created by displaying images in rapid succession.",
    "1.1 DEFINITION OF ANIMATION :",
    "Animation is the process of bringing still images to life by displaying them in a rapid sequence. When played at a certain speed (frames per second), the human eye perceives motion. It is widely used in films, television, video games, and digital media.",
    "1.2 HOW DOES ANIMATION WORK?",
    "Animation relies on the persistence of vision, a phenomenon where the human brain retains an image for a fraction of a second after it disappears. By displaying a series of slightly different images rapidly, our brain interprets them as continuous motion.",
    "KEY CONCEPTS :",
    "1. Frames: Individual images in an animation sequence.",
    "2. Frame Rate (FPS - Frames Per Second): Determines the smoothness of animation (e.g., 24 FPS is standard in movies).",
    "3. Keyframes: Important frames that define the starting and ending points of movement.",
    "1.3 IMPORTNCE OF ANIMATION IN DIFFERENT FIELDS :",
    "# Entertainment (Movies, TV Shows, Cartoons) – Brings characters and stories to life.","# Video Games – Provides realistic or stylized movements to game characters.",
    "# Education & E-Learning – Makes learning engaging through interactive videos.",
    "# Advertising & Marketing – Brands use animation for promotional videos and motion graphics.",
    "# Medical & Scientific Visualization – Helps explain complex biological and medical concepts.",
    "# Virtual Reality (VR) & Augmented Reality (AR) – Used for immersive experiences.",
    "🎉 You've completed the lesson! Enjoy your learning journey!"
  ];
  

  const quizQuestions = [
    {
      question: "What is the primary goal of animation?",
      options: [
        "To create realistic images",
        "To create an illusion of movement",
        "To make pictures colorful",
        "To slow down motion"
      ],
      correctAnswer: "To create an illusion of movement"
    },
    {
      question: "Which of the following was an early animation device?",
      options: ["Projector", "Camera", "Thaumatrope", "Microscope"],
      correctAnswer: "Thaumatrope"
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

  const handleLessonCompletion = () => {
    setShowQuiz(true); // Show the quiz after the lesson
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
          <button className="start-quiz-button" onClick={handleLessonCompletion}>
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
          <button className="submit-quiz-button" onClick={handleSubmitQuiz}>
            Submit Quiz
          </button>
          {quizCompleted && (
            <p className="completed-message">🎉 Quiz Completed! Next module unlocked!</p>
          )}
        </div>
      )}

      {/* LESSON COMPLETED SECTION */}
      {lessonCompleted && (
        <div className="completed-section">
          <img src={completeGif} alt="Lesson Completed" className="completed-gif" />
          <p className="completed-message">🎉 Congratulations! You've completed this lesson!</p>
          <button className="done-button" onClick={onComplete}>✅ DONE</button>
        </div>
      )}

      
    </div>
  );
};

export default IntroductionToAnimationLesson;