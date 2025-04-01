import { useState } from "react";
import LogoScreen from "./components/LogoScreen";
import SignIn from "./components/SignIn";

function App() {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <div>
      {showSignIn ? <SignIn /> : <LogoScreen onComplete={() => setShowSignIn(true)} />}
    </div>
  );
}

export default App;
