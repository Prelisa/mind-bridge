import React, { useState } from "react";
import "./dashboard.css";
import Post from "./post/Post";
import { useNavigate } from "react-router-dom";
function Dashboard({ setisLoggedIn, userDetails }) {
  const [showMenu, setshowMenu] = useState(false);
  const nav = useNavigate();
  return (
    <div className="dashBoardContainer">
      <div className="sideNav">
        <div className="user">
          <div className="img">
            <img src="https://avatar.iran.liara.run/public/68" />
          </div>
          <h4>{userDetails?.name}</h4>
        </div>
        <div className="menuBtn active">
          <div className="iconContainer">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" />
              <path d="M14 17H7V15H14V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z" />
            </svg>

            <h4 className="menuText">Post</h4>
          </div>
        </div>
        <div className="menuBtn">
          <div className="iconContainer">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16 11V3H8V9H2V21H22V11H16ZM10 5H14V19H10V5ZM4 11H8V19H4V11ZM20 19H16V13H20V19Z" />
            </svg>

            <h4 className="menuText">Stats</h4>
          </div>
        </div>
        <div className="menuBtn setting">
          <div className="iconContainer">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 18V17.35C4 17.01 4.16 16.69 4.41 16.54C6.1 15.53 8.03 15 10 15C10.03 15 10.05 15 10.08 15.01C10.18 14.31 10.38 13.64 10.67 13.03C10.45 13.01 10.23 13 10 13C7.58 13 5.32 13.67 3.39 14.82C2.51 15.34 2 16.32 2 17.35V20H11.26C10.84 19.4 10.51 18.72 10.29 18H4Z" />
              <path d="M10 12C12.21 12 14 10.21 14 8C14 5.79 12.21 4 10 4C7.79 4 6 5.79 6 8C6 10.21 7.79 12 10 12ZM10 6C11.1 6 12 6.9 12 8C12 9.1 11.1 10 10 10C8.9 10 8 9.1 8 8C8 6.9 8.9 6 10 6Z" />
              <path d="M20.7499 16C20.7499 15.78 20.7199 15.58 20.6899 15.37L21.8299 14.36L20.8299 12.63L19.3799 13.12C19.0599 12.85 18.6999 12.64 18.2999 12.49L17.9999 11H15.9999L15.6999 12.49C15.2999 12.64 14.9399 12.85 14.6199 13.12L13.1699 12.63L12.1699 14.36L13.3099 15.37C13.2799 15.58 13.2499 15.78 13.2499 16C13.2499 16.22 13.2799 16.42 13.3099 16.63L12.1699 17.64L13.1699 19.37L14.6199 18.88C14.9399 19.15 15.2999 19.36 15.6999 19.51L15.9999 21H17.9999L18.2999 19.51C18.6999 19.36 19.0599 19.15 19.3799 18.88L20.8299 19.37L21.8299 17.64L20.6899 16.63C20.7199 16.42 20.7499 16.22 20.7499 16ZM16.9999 18C15.8999 18 14.9999 17.1 14.9999 16C14.9999 14.9 15.8999 14 16.9999 14C18.0999 14 18.9999 14.9 18.9999 16C18.9999 17.1 18.0999 18 16.9999 18Z" />
            </svg>

            <h4 className="menuText">Settings</h4>
          </div>

          {/* <!-- <div className="arrow">
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 9.06493L0.885 9.94993L5.835 4.99993L0.885 0.0499268L0 0.934927L4.065 4.99993L0 9.06493Z" />
        </svg>
      </div> --> */}
        </div>
      </div>
      <div className="toggleContainer">
        <div className="dashboardTopMenu">
          <div className="box">
            <div className="feedback clickable">Feedback?</div>
            <div className="notification clickable">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.0003 20.1666C12.0087 20.1666 12.8337 19.3416 12.8337 18.3333H9.16699C9.16699 19.3416 9.99199 20.1666 11.0003 20.1666ZM16.5003 14.6666V10.0833C16.5003 7.26913 15.0062 4.91329 12.3753 4.28996V3.66663C12.3753 2.90579 11.7612 2.29163 11.0003 2.29163C10.2395 2.29163 9.62532 2.90579 9.62532 3.66663V4.28996C7.00366 4.91329 5.50033 7.25996 5.50033 10.0833V14.6666L3.66699 16.5V17.4166H18.3337V16.5L16.5003 14.6666ZM14.667 15.5833H7.33366V10.0833C7.33366 7.80996 8.71782 5.95829 11.0003 5.95829C13.2828 5.95829 14.667 7.80996 14.667 10.0833V15.5833Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="menuIcon">
              <div className="clickable MenuSVG">
                {showMenu ? (
                  <svg
                    onClick={() => {
                      setshowMenu(false);
                    }}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                      fill="black"
                    />
                  </svg>
                ) : (
                  <svg
                    onClick={() => {
                      setshowMenu(true);
                    }}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z"
                      fill="black"
                    />
                  </svg>
                )}
              </div>

              {showMenu && (
                <div className="dropdownOption">
                  <div className="menuOption">
                    <div className="menuItem home clickable">Home</div>
                    <div className="menuItem help clickable">Help</div>
                    <hr />
                    <div
                      className="menuItem logout clickable"
                      onClick={(e) => {
                        localStorage.removeItem("user");
                        setisLoggedIn(false);
                        setTimeout(() => {
                          nav("/login");
                        }, 2000);
                      }}
                    >
                      Logout
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <Post />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;