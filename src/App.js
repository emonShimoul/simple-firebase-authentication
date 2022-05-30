import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import './App.css';

import initializeAuthentication from "./Firebase/firebase.initialize";
initializeAuthentication();

function App() {
  const [user, setUser] = useState({});
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
    .then(result => {
      const {displayName, email, photoURL} = result.user;
      const loggedInUser = {
        name: displayName,
        email: email,
        photo: photoURL
      };
      setUser(loggedInUser);
    })
  }
  return (
    <div className="App">
      <button onClick={handleGoogleSignIn}>Google Sign In</button>
      <br />
      {
        user.email && <div>
          <h2>Welcome {user.name}</h2>
        </div>
      }
    </div>
  );
}

export default App;
