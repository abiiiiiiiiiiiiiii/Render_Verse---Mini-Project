import { useState } from "react";
import "../index.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import renderverseLogo from "../images/logo2.png";
import bgAnimation from "../images/bg.mp4";
import { auth, db } from "../firebase"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const SignIn = ({ onSignIn, onBack }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(password);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      setError("Password must have at least 8 characters, a capital letter, a small letter, and a special symbol.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Save user data to Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        email,
        completedLessons: [],
        software: "",
      });

      onSignIn(name); // Move to WelcomeMessage
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please log in.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format. Please check and try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="sign-in-screen fade-in">
      <video autoPlay loop muted className="bg-video">
        <source src={bgAnimation} type="video/mp4" />
      </video>
      <div className="sign-in-container">
        <img src={renderverseLogo} alt="Logo" className="renderverse-logo" />
        <h2>First time here?</h2>
        <p>Sign up and start your animation journey!</p>

        <form onSubmit={handleSignUp} className="animated-form">
          <div className="input-container">
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(""); // Clear error on input change
              }}
              required
            />
            <label className={name ? "filled" : ""}>Enter your Name</label>
          </div>

          <div className="input-container">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(""); // Clear error on input change
              }}
              required
            />
            <label className={email ? "filled" : ""}>Enter your Email</label>
          </div>

          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(""); // Clear error on input change
              }}
              required
            />
            <label className={password ? "filled" : ""}>Enter your password</label>
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="sign-in-button">Sign Up</button>
          <button type="button" className="back-button" onClick={onBack}>Back to Login</button>
        </form>

        <p className="login-text">
          Already have an account? <a href="#" onClick={onBack}>Log in!</a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;