import { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { 
  onAuthStateChanged, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import LogoScreen from "./components/LogoScreen";
import Login from "./components/Login";
import SignIn from "./components/SignIn";
import WelcomeMessage from "./components/WelcomeMessage";
import LanguageSelection from "./components/LanguageSelection";
import SoftwareSelection from "./components/SoftwareSelection";
import LoadingScreen from "./components/LoadingPage";
import Dashboard from "./components/Dashboard";
import LessonPage from "./components/LessonPage";
import Footer from "./components/Footer";
import ProfilePage from "./components/ProfilePage";
import LeaderboardPage from "./components/LeaderboardPage";
import GoalsPage from "./components/GoalsPage";
import CoursesPage from "./components/CoursesPage";
import "./App.css";

function App() {
  const [step, setStep] = useState(0);
  const [fade, setFade] = useState("fade-in");
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("");
  const [software, setSoftware] = useState("");
  const [currentLesson, setCurrentLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [showSignIn, setShowSignIn] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); 
  const [activePage, setActivePage] = useState("Dashboard");

  useEffect(() => {
    setStep(0);
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUsername(userData.name);
            setSoftware(userData.software);
            setCompletedLessons(userData.completedLessons || []);
            setTimeout(() => handleNextStep(3), 2000);
          } else {
            setError("User data not found. Please sign in again.");
            setTimeout(() => setStep(1), 2000);
          }
        } catch (err) {
          setError("Failed to retrieve user data: " + err.message);
          setTimeout(() => setStep(1), 2000);
        }
      } else {
        setTimeout(() => setStep(1), 2000);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignUp = async (name, email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        email,
        software: "",
        completedLessons: []
      });
      setUsername(name);
      setSuccessMessage("Successfully signed up! Redirecting...");
      setTimeout(() => handleNextStep(3), 1500);
    } catch (err) {
      setError(err.code === "auth/email-already-in-use" 
        ? "This email is already registered. Please log in." 
        : "Sign-up failed: " + err.message);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDocRef = doc(db, "users", userCredential.user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUsername(userData.name);
        setSoftware(userData.software);
        setCompletedLessons(userData.completedLessons || []);
        setSuccessMessage("Successfully logged in! Redirecting...");
        setTimeout(() => handleNextStep(3), 1500);
      } else {
        setError("User data not found. Please sign in again.");
      }
    } catch (err) {
      setError("Login failed: " + err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUsername("");
      setSoftware("");
      setCompletedLessons([]);
      setStep(1);
    } catch (err) {
      setError("Logout failed: " + err.message);
    }
  };

  const handleNextStep = (newStep) => {
    setFade("fade-out");
    setTimeout(() => {
      setStep(newStep);
      setFade("fade-in");
      setError("");
      setSuccessMessage("");
    }, 500);
  };

  const handleLessonComplete = () => {
    console.log("Lesson completed!");
  };

  return (
    <div className={`app-container ${fade}`}>
      {step === 0 && <LogoScreen onComplete={() => handleNextStep(1)} />}
      {step === 1 && !showSignIn && (
        <Login 
          onLogin={handleLogin} 
          onSignUp={() => { setShowSignIn(true); setError(""); }} 
          error={error} 
          successMessage={successMessage} 
        />
      )}
      {step === 1 && showSignIn && (
        <SignIn 
          onSignUp={handleSignUp} 
          onBack={() => { setShowSignIn(false); setError(""); }} 
          error={error} 
          successMessage={successMessage} 
        />
      )}
      {step === 3 && <WelcomeMessage name={username} onNext={() => handleNextStep(4)} />}
      {step === 4 && <LanguageSelection onNext={(lang) => { setLanguage(lang); handleNextStep(5); }} />}
      {step === 5 && <SoftwareSelection onNext={(soft) => { setSoftware(soft); handleNextStep(6); }} />}
      {step === 6 && <LoadingScreen onComplete={() => handleNextStep(7)} />}
      
      {step === 7 && (
        <>
          {activePage === "Dashboard" && (
            <Dashboard
              selectedSoftware={software}
              onLessonSelect={(lesson) => { setCurrentLesson(lesson); handleNextStep(8); }}
              completedLessons={completedLessons}
              onLogout={handleLogout}
            />
          )}
          {activePage === "Profile" && <ProfilePage />}
          {activePage === "Leaderboard" && <LeaderboardPage />}
          {activePage === "Goals" && <GoalsPage />}
          {activePage === "Courses" && <CoursesPage setActivePage={setActivePage} />}
          <Footer setActivePage={setActivePage} />
        </>
      )}

      {step === 8 && (
        <LessonPage
          lesson={currentLesson}
          onComplete={() => handleNextStep(7)}
          onBack={() => handleNextStep(7)}
        />
      )}
    </div>
  );
}

export default App;
