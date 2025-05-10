import React, { useEffect, useState } from "react";
import "./postPreview.css";
import { FaHome } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getPostInformation, getUserPost } from "../../apis/api";
import { formatcreatedTime } from "../../utils/formatCreatedTime";
import PostCard from "../../components/postCard/PostCard";
function PostPreview({ userDetails }) {
  const nav = useNavigate();
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [keywords, setKeyWords] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [postLists, setPostLists] = useState([]);
  const [body, setBody] = useState("");
  const [isPostLoading, setIsPostLoading] = useState(false);

  const setPostInformation = async () => {
    try {
      const postInformation = await getPostInformation(postId);
      console.log({ postInformation });
      setTitle(postInformation.result.title);
      setSubTitle(postInformation.result.subTitle);
      setKeyWords(postInformation.result.keywords.join(","));
      setImageUrl(postInformation.result.thumbnailUrl);
      setBody(postInformation.result.body);
      setAuthorName(postInformation.result.authorName);
      setAuthorEmail(postInformation.result.authorEmail);
      getAuthorMorePost(postInformation.result.authorEmail);

      setCreatedDate(formatcreatedTime(postInformation.result.createdTime));
    } catch (error) {
      setTitle("");
      setSubTitle("");
      setKeyWords("");
      setImageUrl("");
    }
  };

  const getAuthorMorePost = async (email) => {
    try {
      setIsPostLoading(true);
      const res = await getUserPost(email);
      console.log({ res });
      if (res.status) {
        setPostLists(res.result);
      }
      document.getElementById("pp-super").scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } catch (error) {
    } finally {
      setIsPostLoading(false);
    }
  };
  useEffect(() => {
    if (postId) {
      setPostInformation();
    }

    return () => {};
  }, [window.location.pathname]);
  return (
    <div className="pp-super" id="pp-super">
      <div className="headerContainer">
        <div className="header">
          <div className="desktop clickable">
            <FaHome />
          </div>
          <h2 className="pp-authorName clickable">MindBridge</h2>
          <div
            className="brand"
            onClick={() => {
              if (userDetails == null) {
                nav("/login");
              } else {
                nav("/");
              }
            }}
          >
            {userDetails == null ? "Login" : "Go to Search"}
          </div>
        </div>
      </div>

      <div className="pp-container">
        <h1 className="pp-headline">{title}</h1>
        <p className="post-description">{subTitle}</p>
        <div className="pp-author">
          <div className="pp-authorImg">
            <img src="https://as1.ftcdn.net/v2/jpg/05/16/27/58/1000_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg" />
          </div>
          <div className="pp-authorBody">
            <p className="pp-name">{authorName}</p>
            <div className="pp-details">
              <p className="pp-postDate">{createdDate}</p>
              <div className="voteBox">
                <div className="upVote clickable">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 6L1.0575 7.0575L5.25 2.8725V12H6.75V2.8725L10.935 7.065L12 6L6 0L0 6Z"
                      fill="#1C68FC"
                    />
                  </svg>
                </div>
                <div className="voteNumber">
                  <p className="voteText">2</p>
                </div>
                <div className="downVote clickable">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 6L10.9425 4.9425L6.75 9.1275L6.75 -4.94705e-07L5.25 -3.63571e-07L5.25 9.1275L1.065 4.935L-1.47821e-06 6L6 12L12 6Z"
                      fill="black"
                      fill-opacity="0.6"
                    />
                  </svg>
                </div>
              </div>
              <div className="pp-share clickable">
                <svg
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5 11.06C10.93 11.06 10.42 11.285 10.03 11.6375L4.6825 8.525C4.72 8.3525 4.75 8.18 4.75 8C4.75 7.82 4.72 7.6475 4.6825 7.475L9.97 4.3925C10.375 4.7675 10.9075 5 11.5 5C12.745 5 13.75 3.995 13.75 2.75C13.75 1.505 12.745 0.5 11.5 0.5C10.255 0.5 9.25 1.505 9.25 2.75C9.25 2.93 9.28 3.1025 9.3175 3.275L4.03 6.3575C3.625 5.9825 3.0925 5.75 2.5 5.75C1.255 5.75 0.25 6.755 0.25 8C0.25 9.245 1.255 10.25 2.5 10.25C3.0925 10.25 3.625 10.0175 4.03 9.6425L9.37 12.7625C9.3325 12.92 9.31 13.085 9.31 13.25C9.31 14.4575 10.2925 15.44 11.5 15.44C12.7075 15.44 13.69 14.4575 13.69 13.25C13.69 12.0425 12.7075 11.06 11.5 11.06ZM11.5 2C11.9125 2 12.25 2.3375 12.25 2.75C12.25 3.1625 11.9125 3.5 11.5 3.5C11.0875 3.5 10.75 3.1625 10.75 2.75C10.75 2.3375 11.0875 2 11.5 2ZM2.5 8.75C2.0875 8.75 1.75 8.4125 1.75 8C1.75 7.5875 2.0875 7.25 2.5 7.25C2.9125 7.25 3.25 7.5875 3.25 8C3.25 8.4125 2.9125 8.75 2.5 8.75ZM11.5 14.015C11.0875 14.015 10.75 13.6775 10.75 13.265C10.75 12.8525 11.0875 12.515 11.5 12.515C11.9125 12.515 12.25 12.8525 12.25 13.265C12.25 13.6775 11.9125 14.015 11.5 14.015Z"
                    fill="black"
                    fill-opacity="0.6"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <img className="pp-mainImage" src={imageUrl} />
        <div
          className="pp-mainBody"
          dangerouslySetInnerHTML={{ __html: body }}
        ></div>
        <div className="pp-details">
          <p className="pp-postDate">{createdDate}</p>
          <div className="voteBox">
            <div className="upVote clickable">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 6L1.0575 7.0575L5.25 2.8725V12H6.75V2.8725L10.935 7.065L12 6L6 0L0 6Z"
                  fill="#1C68FC"
                />
              </svg>
            </div>
            <div className="voteNumber">
              <p className="voteText"> 2 </p>
            </div>
            <div className="downVote clickable">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 6L10.9425 4.9425L6.75 9.1275L6.75 -4.94705e-07L5.25 -3.63571e-07L5.25 9.1275L1.065 4.935L-1.47821e-06 6L6 12L12 6Z"
                  fill="black"
                  fill-opacity="0.6"
                />
              </svg>
            </div>
          </div>
          <div className="pp-share clickable">
            <svg
              width="14"
              height="16"
              viewBox="0 0 14 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5 11.06C10.93 11.06 10.42 11.285 10.03 11.6375L4.6825 8.525C4.72 8.3525 4.75 8.18 4.75 8C4.75 7.82 4.72 7.6475 4.6825 7.475L9.97 4.3925C10.375 4.7675 10.9075 5 11.5 5C12.745 5 13.75 3.995 13.75 2.75C13.75 1.505 12.745 0.5 11.5 0.5C10.255 0.5 9.25 1.505 9.25 2.75C9.25 2.93 9.28 3.1025 9.3175 3.275L4.03 6.3575C3.625 5.9825 3.0925 5.75 2.5 5.75C1.255 5.75 0.25 6.755 0.25 8C0.25 9.245 1.255 10.25 2.5 10.25C3.0925 10.25 3.625 10.0175 4.03 9.6425L9.37 12.7625C9.3325 12.92 9.31 13.085 9.31 13.25C9.31 14.4575 10.2925 15.44 11.5 15.44C12.7075 15.44 13.69 14.4575 13.69 13.25C13.69 12.0425 12.7075 11.06 11.5 11.06ZM11.5 2C11.9125 2 12.25 2.3375 12.25 2.75C12.25 3.1625 11.9125 3.5 11.5 3.5C11.0875 3.5 10.75 3.1625 10.75 2.75C10.75 2.3375 11.0875 2 11.5 2ZM2.5 8.75C2.0875 8.75 1.75 8.4125 1.75 8C1.75 7.5875 2.0875 7.25 2.5 7.25C2.9125 7.25 3.25 7.5875 3.25 8C3.25 8.4125 2.9125 8.75 2.5 8.75ZM11.5 14.015C11.0875 14.015 10.75 13.6775 10.75 13.265C10.75 12.8525 11.0875 12.515 11.5 12.515C11.9125 12.515 12.25 12.8525 12.25 13.265C12.25 13.6775 11.9125 14.015 11.5 14.015Z"
                fill="black"
                fill-opacity="0.6"
              />
            </svg>
          </div>
        </div>
      </div>

      <hr />
      <div className="pp-container" style={{ padding: "0" }}>
        <div className="pp-moreFromAuthor">
          <h2 className="moreFromAuthorHeadline">More from {authorName}</h2>

          <div>
            <div>
              {postLists.slice(0, 3).map((data) => {
                return (
                  <PostCard
                    isPublic={true}
                    title={data.title}
                    createdTime={data.createdTime}
                    description={data.subTitle}
                    imgUrl={data.thumbnailUrl}
                    id={data._id}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="showMorebtn clickable">Show more</div>
      </div>
    </div>
  );
}

export default PostPreview;
