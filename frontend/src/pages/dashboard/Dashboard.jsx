import React, { useState } from "react";
import "./dashboard.css";
import Post from "./post/Post";
import { GrLogout } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
function Dashboard({ setisLoggedIn, userDetails, handleLogout }) {
  const [showMenu, setshowMenu] = useState(false);
  const nav = useNavigate();
  return (
    <div className="dashBoardContainer">
      <div className="sideNav">
        <div className="user">
          <div className="img">
            <img src="https://avatar.iran.liara.run/public/68" />
          </div>
          <div>
            <h4>{userDetails?.name}</h4>
            <p style={{ fontSize: "12px" }}>{userDetails?.email}</p>
          </div>
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

            <h4 className="menuText">Post Dashboard</h4>
          </div>
        </div>

        <div
          className="menuBtn setting"
          onClick={(e) => {
            nav("/");
          }}
        >
          <div className="iconContainer">
            <FaSearch />

            <h4 className="menuText">Go to Search</h4>
          </div>
        </div>
        <div
          className="menuBtn logout"
          onClick={(e) => {
            handleLogout();
            nav("/login");
          }}
        >
          <div className="iconContainer">
            <GrLogout />

            <h4 className="menuText">Logout</h4>
          </div>
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
          <Post userDetails={userDetails} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
