import { useEffect } from "react";
import bgAnimation from "../images/bg.mp4";

const WelcomeMessage = ({ name, onNext }) => {
  useEffect(() => {
    setTimeout(() => {
      onNext(); // Move to Language Selection after animation
    }, 3000);
  }, [onNext]);

  return (
    <><div className="sign-in-screen fade-in"></div><video autoPlay loop muted className="bg-video">
      <source src={bgAnimation} type="video/mp4" />
    </video><div className="welcome-message">
        <h1>Welcome {name}!!</h1>
      </div></>
  );
};

export default WelcomeMessage;
