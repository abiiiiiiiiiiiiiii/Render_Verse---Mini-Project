import React, { useState, useEffect } from "react";
import "../index.css";
import completeGif from "../images/done.gif";
import pointsGif from "../images/diamond.gif";
import streakGif from "../images/confetti.gif";
import squash from "../images/squash.gif";
import anticipation from "../images/anticipation.gif";
import staging from "../images/staging.gif";
import p2p from "../images/p2p.gif";
import arc from "../images/arc.gif";
import slowin from "../images/slowin.gif";
import sec from "../images/secondaryaction.gif";
import timing from "../images/timing.gif";
import ex from "../images/exageration.gif";
import solid from "../images/solid.gif";
import appeal from "../images/appeal.gif";
import followthrough from "../images/followthrough.gif";

const PrinciplesOfAnimation = ({ onComplete, onBack }) => {
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
    "🎬 The 12 Principles of Animation were developed by Disney animators Frank Thomas and Ollie Johnston to create more natural and appealing motion.",
    { text: "1. Squash and Stretch – Adds weight and flexibility.", gif: squash },
    { text: "2. Anticipation – Prepares the audience for movement.", gif: anticipation },
    { text: "3. Staging – Proper placement of characters and objects.", gif: staging },
    { text: "4. Straight Ahead & Pose to Pose – Two different animation techniques.", gif: p2p },
    { text: "5. Follow Through & Overlapping Action – Shows the effect of movement.", gif: followthrough },
    { text: "6. Slow In & Slow Out – Smoothens the animation.", gif: slowin },
    { text: "7. Arcs – Ensures natural movement.", gif: arc },
    { text: "8. Secondary Action – Adds more realism to movement.", gif: sec },
    { text: "9. Timing – Determines the speed of action.", gif: timing },
    { text: "10. Exaggeration – Enhances expressions and movement.", gif: ex },
    { text: "11. Solid Drawing – Understanding depth, weight, and volume.", gif: solid },
    { text: "12. Appeal – Making characters visually interesting.", gif: appeal },
    "🎉 You've completed the lesson! Now, let's test your knowledge with a quiz!"
  ];

  const quizQuestions = [
    {
      question: "Which principle of animation ensures that animated movements follow the laws of physics, such as gravity and weight?",
      options: [
        "Squash and Stretch",
        "Anticipation",
        "Timing and Spacing",
        "Exaggeration"
      ],
      correctAnswer: "Squash and Stretch"
    },
    {
      question: "Which animation principle involves adding a preparatory action before the main movement, making the motion more realistic?",
      options: ["Follow Through and Overlapping Action", "Anticipation", "Arcs", "Staging"],
      correctAnswer: "Anticipation"
    },
    {
      question: "What principle helps in making animations look smoother by ensuring parts of the character continue moving even after the main action has stopped?",
      options: ["Timing and Spacing", "Follow Through and Overlapping Action", "Slow In and Slow Out", "Appeal"],
      correctAnswer: "Follow Through and Overlapping Action"
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
            typeof content === "string" ? (
              <p key={index} className="lesson-content">{content}</p>
            ) : (
              <div key={index} className="lesson-section">
                <p className="lesson-content">{content.text}</p>
                <img src={content.gif} alt="Animation Principle" className="lesson-gif" />
              </div>
            )
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

export default PrinciplesOfAnimation;