import { useState, useEffect, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import CurrentUserContext from "../../context/CurrentUserContext";
import Main from './../Main/Main';
import Movies from './../Movies/Movies';
import SavedMovies from './../SavedMovies/SavedMovies';
import Profile from './../Profile/Profile';
import Register from './../Authentication/Register/Register';
import Login from './../Authentication/Login/Login';
import NotFound from './../NotFound/NotFound';
import authApi from "../../utils/AuthApi";
import mainApi from "../../utils/MainApi";
import { UPDATE_PROFILE_MESSAGE, errorHeandler } from "../../utils/constants";

import "./App.css";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";


function App() {

  const sessionStorageAuth = JSON.parse(sessionStorage.getItem("loggedIn"));
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorageAuth || false );
  const [currentUser, setCurrentUser] = useState({});
  const [message, setMessage] = useState('');
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const navigate = useNavigate();

  function debouncer(callback, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { callback.apply(this, args); }, timeout);
    };
  }

  const handleResize = useCallback(debouncer(() => {
    setScreenWidth(window.innerWidth);
  }, 700), [screenWidth]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  function handleUpdateUser(formData) {
    mainApi.patchUserInfo(formData).then((data) => {
      setCurrentUser(data);
      setMessage(UPDATE_PROFILE_MESSAGE);
    }).catch((err) => {
      setMessage(errorHeandler(err));
    })
  }

  function handleSignup(formData) {
    authApi.signUp(formData).then(() => {
      handleSignin(formData);
    }).catch((err) => {
      setMessage(errorHeandler(err));
    })
  }

  function handleSignin(formData) {
    authApi.signIn(formData).then(() => {
      setIsLoggedIn(true);
      navigate("/movies", { replace: true });
    }).catch((err) => {
      setMessage(errorHeandler(err));
    })
  }

  function handleLogout() {
    authApi.logout().then(() => {
      sessionStorage.clear();
      localStorage.clear();
      setIsLoggedIn(false);
      setCurrentUser({})
    }).catch(err => {
      console.log(err)
    })
  }

  async function handleTokenCheck() {
    await mainApi
      .getUserInfo()
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          sessionStorage.setItem("loggedIn", "true");
          setCurrentUser(res);
          sessionStorage.setItem("currentUser", JSON.stringify(res));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setMessage("")
  }, [navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      handleTokenCheck();
    }
  }, [isLoggedIn]);

  return (

      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />
            <Route path="/movies" element={
                      <ProtectedRoute
                      loggedIn={isLoggedIn}
                      element={Movies}
                      screenWidth={screenWidth}
                      message={message}
                      setMessage={setMessage}
                    />
                  }
             />
            <Route path="/saved-movies" element={
                      <ProtectedRoute
                      loggedIn={isLoggedIn}
                      element={SavedMovies}
                      message={message}
                      setMessage={setMessage}
                    />
                  }
             />
            <Route path="/profile" element={
                      <ProtectedRoute
                      loggedIn={isLoggedIn}
                      element={Profile}
                      handleUpdateUser={handleUpdateUser}
                      handleLogout={handleLogout}
                      profileResponse={message}
                    />
                  }
             />
            <Route path="/signup" element={
                      <ProtectedRoute
                      loggedIn={!isLoggedIn}
                      element={Register}
                      handleSignup={handleSignup}
                      message={message}
                    />
                  }
             />
            <Route path="/signin" element={
                    <ProtectedRoute
                      loggedIn={!isLoggedIn}
                      element={Login}
                      handleSignin={handleSignin}
                      message={message}
                    />
                  }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CurrentUserContext.Provider>
      </div>
  );
}

export default App;
