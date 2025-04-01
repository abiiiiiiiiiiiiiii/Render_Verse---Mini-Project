import { useState } from "react";
import "../index.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import renderverseLogo from "../images/logo2.png";
import bgAnimation from "../images/bg.mp4";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Login = ({ onLogin, onSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDocRef = doc(db, "users", userCredential.user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // Create user data in Firestore if it doesn’t exist
        await setDoc(userDocRef, {
          name: email.split("@")[0], // Use part of email as username
          completedLessons: [],
          software: "",
        });
      }
      // Pass the name from Firestore or derive it
      onLogin(userDoc.exists() ? userDoc.data().name : email.split("@")[0]);
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email. Please sign up.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login-screen fade-in">
      <video autoPlay loop muted className="bg-video">
        <source src={bgAnimation} type="video/mp4" />
      </video>
      <div className="login-container">
        <img src={renderverseLogo} alt="Logo" className="renderverse-logo" />
        <h2>Welcome Back!</h2>
        <p>Log in to continue your animation journey!</p>

        <form onSubmit={handleLogin} className="animated-form">
          <div className="input-container">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className={email ? "filled" : ""}>Enter your Email</label>
          </div>

          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          <button type="submit" className="login-button">Log In</button>
        </form>

        <p className="signup-text">
          New here? <span onClick={onSignUp} className="signup-link">Create an account!</span>
        </p>
      </div>
    </div>
  );
};

export default Login;