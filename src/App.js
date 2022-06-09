import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, signOut } from "firebase/auth";
import { useState } from "react";
import './App.css';

import initializeAuthentication from "./Firebase/firebase.initialize";
initializeAuthentication();

function App() {
  const [user, setUser] = useState({});

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const auth = getAuth();

  // google sign in
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
    .then(result => {
      const {displayName, email, photoURL} = result.user;
      const loggedInUser = {
        name: displayName,
        email: email,
        photo: photoURL
      };
      setUser(loggedInUser);
    })
    .catch(error => {
      console.log(error.message);
    })
  }

  // github sign in
  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
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

// facebook sign in
  const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
    .then(result => {
      const {displayName, email, photoURL} = result.user;
      console.log(result.user);
      const loggedInUser = {
        name: displayName,
        email: email,
        photo: photoURL
      };
      setUser(loggedInUser);
    })
  }

  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
      setUser({});
    })
  }
  return (
    <div className="App">
      { !user.name ?
      <div>
        <button onClick={handleGoogleSignIn}>Google Sign In</button>
        <button onClick={handleGithubSignIn}>Github Sign In</button>
        <button onClick={handleFacebookSignIn}>Facebook Sign In</button>
      </div>:
      <button onClick={handleSignOut}>SignOut</button>
      }
      <br />
      {
        user.name && <div>
          <h2>Welcome {user.name}</h2>
          <p>Email: {user.email}</p>
          <img src={user.photo} />
        </div>
      }
    </div>
  );
}

export default App;
