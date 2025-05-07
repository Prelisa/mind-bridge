import React, { useEffect, useState } from "react";
import "./login.css";
import error_outline from "../../assets/error_outline.svg";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

function Login({ setisLoggedIn }) {
  const nav = useNavigate();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [errorName, seterrorName] = useState("");
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {

    return () => {};
  }, []);

  return (
    <>
      <Header />
      <div className='mindBridgeMainContainer'>
        <div className='loginWithPW'>
          <div className='signInFormControl'>
            <div className='title'>
              <h3>Login to your account</h3>
            </div>
            <form className='form'>
              <div className='formInputBox'>
                <div className='ForumEmail'>
                  <input
                    type='email'
                    value={email}
                    onChange={(e) => {
                      setemail(e.target.value);
                    }}
                    placeholder='Your email address'
                  />
                </div>
              </div>
              <div className='formInputBox'>
                <div className='ForumEmail'>
                  <input
                    type='password'
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    placeholder='Your password'
                  />
                </div>
              </div>
              {errorName.length >= 1 && (
                <div className='invalidEmailErrorSection'>
                  <img className='invalidEmailErrorSVG' src={error_outline} />
                  <p>{errorName}</p>
                </div>
              )}
              <div className='buttonFlex'>
                <button
                  className='loginBtn'
                  type='button'
                  disabled={isLoading || email.length <= 0 || password.length <= 0}
                  onClick={async (e) => {
                   alert('hi')
                  }}>
                  {isLoading ? "Verifying.." : "Login"}
                </button>
                {isLoading && <Spinner animation='border' size='sm' className='spinner' variant='dark' />}
              </div>
            </form>
          </div>
          <div className='SignUpPageRedirect'>
            <p>
              Looking to create an account?{" "}
              <span
                className='blue btn'
                onClick={() => {
                  nav("/signUp");
                }}>
                Click here
              </span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
