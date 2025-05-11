import React, { useEffect, useState } from "react";
import "./searchResult.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { searchPost } from "../../apis/api";
import SkeletonLoader from "../../components/loader/SkeletonLoader";
import PostCard from "../../components/postCard/PostCard";
import logo from "../../assets/logo.png";
import NoResultFound from "../../components/noResult/NoResult";
function SearchResult({ userDetails }) {
  const [isShowMenu, setisShowMenu] = useState(false);
  const { searchTerm } = useParams();
  const nav = useNavigate();
  const [isPostLoading, setIsPostLoading] = useState(true);
  const [postLists, setPostLists] = useState([]);
  const [searchText, setSearchText] = useState(searchTerm);

  const handleSearchpost = async () => {
    try {
      setIsPostLoading(true);
      console.log({ searchTerm, searchText });
      setSearchText(encodeURIComponent(searchTerm));
      const resp = await searchPost(searchTerm);
      console.log({ resp });
      setPostLists(resp.result);
      setIsPostLoading(false);
    } catch (error) {}
  };
  useEffect(() => {
    handleSearchpost();
    return () => {
      setIsPostLoading(true);
      setPostLists([]);
      setSearchText(encodeURIComponent(searchTerm));
    };
  }, [window.location.pathname]);

  return (
    <div className="search-result-container">
      <div className="navContainer">
        <div className="sr-navbar">
          <a
            className="logo"
            onClick={() => {
              nav("/");
            }}
          >
            <img src={logo} />
          </a>

          <div className="sr-search-bar">
            <span className="textBox">
              <input
                type="text"
                name=""
                id="searchBox"
                value={searchText}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    nav(`/searchResult/${encodeURIComponent(searchText)}`);
                  }
                }}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
            </span>
            <span
              className="cancelBtn"
              style={{
                opacity: searchText.length >= 1 ? 1 : 0,
                cursor: searchText.length >= 1 ? "pointer" : "default",
              }}
              onClick={(e) => {
                if (searchText.length >= 1) {
                  setSearchText("");
                }
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                  fill="black"
                  fillOpacity="0.6"
                />
              </svg>
            </span>
            <div className="vLine"></div>
            <span
              className="searchBtn"
              onClick={(e) => {
                if (searchText.length >= 1) {
                  nav(`/searchResult/${encodeURIComponent(searchText)}`);
                }
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                  fill="black"
                  fillOpacity="0.8"
                />
              </svg>
            </span>
          </div>
          <div className="box">
            <div className="menuIcon">
              <div
                className="headerUserIcon login"
                onClick={(e) => {
                  nav("/dashboard");
                }}
              >
                <div className="img">
                  <img src="https://avatar.iran.liara.run/public/68" />
                </div>
                {userDetails == null ? (
                  <div>Login</div>
                ) : (
                  <div>
                    <h4>{userDetails?.name}</h4>
                    <p style={{ fontSize: "12px" }}>{userDetails?.email}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="sr-navbar-mobile">
          <div className="ctaBar">
            <div className="sr-mobile-logo">
              <div className="sr-mobile-Icon">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 0H30V30H0V15.01H7.5V22.5H22.5V7.5H0V0Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div className="sr-mobile-MindBridgeName">MindBridge</div>
            </div>
            <div className="sr-mobileMenu">
              <svg
                width="24"
                height="30"
                viewBox="0 0 24 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 21H21V19H3V21ZM3 16H21V14H3V16ZM3 9V11H21V9H3Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
          <div className="sr-mobileSearchBar">
            <span className="sr-mobile-textBox">
              <input type="text" name="" id="searchBar-mobile" />
            </span>

            <span
              className="sr-mobile-searchBtn"
              onClick={(e) => {
                if (searchText.length >= 1) {
                  nav(`/searchResult/${encodeURIComponent(searchText)}`);
                }
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                  fill="black"
                  fillOpacity="0.8"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div className="resultMainPage">
        <div className="filterSection">
          <div className="allRegion">
            <span className="text"> All regions </span>
            <span className="icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.83301 8.33325L9.99967 12.4999L14.1663 8.33325H5.83301Z"
                  fill="black"
                  fillOpacity="0.6"
                />
              </svg>
            </span>
          </div>
          <div className="allRegion">
            <span className="text"> Any time </span>
            <span className="icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.83301 8.33325L9.99967 12.4999L14.1663 8.33325H5.83301Z"
                  fill="black"
                  fillOpacity="0.6"
                />
              </svg>
            </span>
          </div>
        </div>
        <div className="suggestionResult">
          <span className="text">Including results for </span> <span></span>
          <span className="suggestion"> {decodeURIComponent(searchTerm)} </span>
        </div>

        <div>
          <div className="sr-results">
            {isPostLoading ? (
              <div>
                <SkeletonLoader height={"150px"} width={"98%"} />
                <SkeletonLoader height={"150px"} width={"98%"} />
                <SkeletonLoader height={"150px"} width={"98%"} />
                <SkeletonLoader height={"150px"} width={"98%"} />
              </div>
            ) : (
              <div>
                {postLists.length <= 0 && !isPostLoading ? (
                  <NoResultFound keySearch={decodeURIComponent(searchTerm)} />
                ) : null}
                {postLists.map((data) => {
                  return (
                    <PostCard
                      handleDeletePost={() => {}}
                      title={data.title}
                      createdTime={data.createdTime}
                      description={data.subTitle}
                      imgUrl={data.thumbnailUrl}
                      id={data._id}
                      isPublic={true}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
