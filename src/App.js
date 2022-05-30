import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import './App.css';

import initializeAuthentication from "./Firebase/firebase.initialize";
initializeAuthentication();

function App() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
    .then(result => {
      const user = result.user;
      console.log(user);
    })
  }
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Google Sign In</button>
    </div>
  );
}

export default App;
