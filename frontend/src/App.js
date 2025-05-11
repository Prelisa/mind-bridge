import logo from "./logo.svg";
import "./App.css";
import SignUpPage from "./pages/signup/SignUpPage";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import PostEditor from "./pages/dashboard/postEditor/PostEditor";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import SearchResult from "./pages/search/SearchResult";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import PostPreview from "./pages/postPreview/PostPreview";
import SearchHomePage from "./pages/searchHome/SearchHome";
import { loginUser } from "./apis/api";
function App() {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [userDetails, setuserDetails] = useState(null);
  const processAuth = async () => {
    const user = localStorage.getItem("user");
    console.log(user);
    setuserDetails(null);
    setisLoggedIn(false);
    if (user) {
      const json = JSON.parse(user);
      let obj = jwtDecode(json);
      obj["jwt"] = json;
      console.log(obj);
      if (obj.exp <= new Date().getTime()) {
        localStorage.removeItem("user");
        setisLoggedIn(false);
        setuserDetails(null);
      } else {
        setuserDetails(obj);
        setisLoggedIn(true);
      }
    }
  };
  const handleLogin = async (e, email, password) => {
    try {
      e.preventDefault();
      console.log({ email, password });
      const res = await loginUser(email, password);
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(res.result.jwtToken));
      let obj = jwtDecode(res.result.jwtToken);
      obj["jwt"] = res.result.jwtToken;
      setuserDetails(obj);
      setisLoggedIn(true);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  };
  const handleLogout = async () => {
    localStorage.removeItem("user");
    setisLoggedIn(false);
    setuserDetails(null);
    processAuth();
  };
  useEffect(() => {
    processAuth();
    return () => {};
  }, [window.location.pathname]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path={"/searchResult/:searchTerm"}
            element={<SearchResult userDetails={userDetails} />}
          />
          <Route
            path={"/post/preview/:postId"}
            element={<PostPreview userDetails={userDetails} />}
          />
          {isLoggedIn ? (
            <>
              <Route
                element={<SearchHomePage userDetails={userDetails} />}
                path={"/"}
              />
              <Route
                path={"/post/edit"}
                element={<PostEditor userDetails={userDetails} />}
              />{" "}
              <Route
                path={"/post/edit/:postId"}
                element={<PostEditor userDetails={userDetails} />}
              />
              <Route
                path={"/dashboard"}
                element={
                  <Dashboard
                    handleLogout={handleLogout}
                    userDetails={userDetails}
                    setisLoggedIn={setisLoggedIn}
                  />
                }
              />
              <Route path={"/login"} element={<Navigate to="/dashboard" />} />
            </>
          ) : (
            <>
              <Route
                element={<SearchHomePage userDetails={userDetails} />}
                path={"/"}
              />
              <Route
                path={"/signUp"}
                element={<SignUpPage setisLoggedIn={setisLoggedIn} />}
              />
              <Route
                path={"/login"}
                element={
                  <Login
                    handleLogin={handleLogin}
                    setisLoggedIn={setisLoggedIn}
                  />
                }
              />
              <Route path={"/dashboard"} element={<Navigate to="/login" />} />
              <Route path={"/post/edit"} element={<Navigate to="/login" />} />
              <Route
                path={"/post/edit/:postId"}
                element={<Navigate to="/login" />}
              />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
