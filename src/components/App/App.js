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
import { ERROR_MESSAGE, UPDATE_PROFILE_MESSAGE, errorHeandler } from "../../utils/constants";

import "./App.css";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import moviesApi from "../../utils/MoviesApi";


function App() {

  const localStorageAuth = JSON.parse(localStorage.getItem("loggedIn"));
  const [isLoggedIn, setIsLoggedIn] = useState(localStorageAuth || false );
  const [currentUser, setCurrentUser] = useState({});
  const [allMovies, setAllMovies] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    mainApi.patchUserInfo(formData).then((data) => {
      setCurrentUser(data);
      setMessage(UPDATE_PROFILE_MESSAGE);
    }).catch((err) => {
      setMessage(errorHeandler(err));
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  function handleSignup(formData) {
    setIsLoading(true);
    authApi.signUp(formData).then(() => {
      handleSignin(formData);
    }).catch((err) => {
      setMessage(errorHeandler(err));
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  function handleSignin(formData) {
    setIsLoading(true);
    authApi.signIn(formData).then(() => {
      setIsLoggedIn(true);
      navigate("/movies", { replace: true });
    }).catch((err) => {
      setMessage(errorHeandler(err));
    })
    .finally(() => {
      setIsLoading(false);
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
          localStorage.setItem("loggedIn", "true");
          setCurrentUser(res);
          sessionStorage.setItem("currentUser", JSON.stringify(res));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function loadMovies() {
    setIsLoading(true);
    Promise.all([
      moviesApi.getMovies(),
      mainApi.getSavedMovies()
    ])
      .then(([allMovies, savedMovies]) => {
        const movies = allMovies.map((allMovies) => {
          const savedMovie = savedMovies.find((savedFilm) => allMovies.id === savedFilm.movieId);
          if(savedMovie) {
            allMovies.isSaved = true;
            allMovies._id = savedMovie._id;
          }else{
            allMovies.isSaved = false;
          }
          return allMovies;
        })
        setAllMovies(movies);
        localStorage.setItem('movies', JSON.stringify(movies))
      })
      .catch((err) => {
        setMessage(ERROR_MESSAGE);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  useEffect(() => {
    setMessage("")
  }, [navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      handleTokenCheck();
      loadMovies();
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
                      allMovies={allMovies}
                      setAllMovies={setAllMovies}
                      screenWidth={screenWidth}
                      message={message}
                    />
                  }
             />
            <Route path="/saved-movies" element={
                      <ProtectedRoute
                      loggedIn={isLoggedIn}
                      element={SavedMovies}
                      allMovies={allMovies}
                      setAllMovies={setAllMovies}
                      message={message}
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
                      isLoading={isLoading}
                    />
                  }
             />
            <Route path="/signup" element={
                      <ProtectedRoute
                      loggedIn={!isLoggedIn}
                      element={Register}
                      handleSignup={handleSignup}
                      message={message}
                      isLoading={isLoading}
                    />
                  }
             />
            <Route path="/signin" element={
                    <ProtectedRoute
                      loggedIn={!isLoggedIn}
                      element={Login}
                      handleSignin={handleSignin}
                      message={message}
                      isLoading={isLoading}
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
