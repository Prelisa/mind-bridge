import React from "react";
import "./header.css";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
function Header() {
  const nav = useNavigate();
  return (
    <div className="headerContainer">
      <div className="mindBridgeMainContainer header">
        <div className="brand">
          <div className="iconMindBridge">
            <img src={logo} />
          </div>
          <div className="brandName">MindBridge</div>
          {/* <div className="search">
            <input placeholder="Search MindBridge" name="" id="searchInput" />

            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.9167 11.6667H12.2583L12.025 11.4417C12.8417 10.4917 13.3333 9.25833 13.3333 7.91667C13.3333 4.925 10.9083 2.5 7.91667 2.5C4.925 2.5 2.5 4.925 2.5 7.91667C2.5 10.9083 4.925 13.3333 7.91667 13.3333C9.25833 13.3333 10.4917 12.8417 11.4417 12.025L11.6667 12.2583V12.9167L15.8333 17.075L17.075 15.8333L12.9167 11.6667ZM7.91667 11.6667C5.84167 11.6667 4.16667 9.99167 4.16667 7.91667C4.16667 5.84167 5.84167 4.16667 7.91667 4.16667C9.99167 4.16667 11.6667 5.84167 11.6667 7.91667C11.6667 9.99167 9.99167 11.6667 7.91667 11.6667Z"
                fill="#959DA5"
              />
            </svg>
          </div> */}
        </div>

        <div className="desktop cta">
          <span
            className="login"
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              nav("/login");
            }}
          >
            Login{" "}
          </span>{" "}
          <span style={{ margin: "0px 10px" }}>|</span>{" "}
          <span
            style={{ cursor: "pointer" }}
            className="register"
            onClick={(e) => {
              nav("/signUp");
            }}
          >
            {" "}
            Register
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
