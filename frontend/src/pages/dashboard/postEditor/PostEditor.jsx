import React, { useState, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import Quill styles

import "./postEditor.css";
import { useNavigate, useParams } from "react-router-dom";
import { createPost, getPostInformation, updatePost } from "../../../apis/api";
import { Button, Modal, Spinner, Toast, ToastContainer } from "react-bootstrap";

function PostEditor({ userDetails }) {
  const editorRef = useRef(null);
  const quillInstance = useRef(null);
  const [isShowEditor, setisShowEditor] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [keywords, setKeyWords] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPostingContent, setisPostingContent] = useState(false);
  const [isUpdatePostActive, setIsUpdatePostActive] = useState(false);

  const nav = useNavigate();
  const { postId } = useParams();
  const setPostInformation = async () => {
    try {
      setIsUpdatePostActive(true);
      const postInformation = await getPostInformation(postId);
      console.log({ postInformation });
      setTitle(postInformation.result.title);
      setSubTitle(postInformation.result.subTitle);
      setKeyWords(postInformation.result.keywords.join(","));
      setImageUrl(postInformation.result.thumbnailUrl);
      if (quillInstance.current) {
        quillInstance.current.root.innerHTML = postInformation.result.body;
      }
    } catch (error) {
      setTitle("");
      setSubTitle("");
      setKeyWords("");
      setImageUrl("");
      setIsUpdatePostActive(false);
    }
  };

  useEffect(() => {
    console.log({ editorRef: editorRef.current, postId });
    if (editorRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write something...",
        modules: {
          toolbar: true,
        },
      });
      if (postId) {
        setPostInformation();
      }
    }

    return () => {};
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setshowToast(false);

    let editorContent = "";
    if (quillInstance.current) {
      editorContent = quillInstance.current.root.innerHTML;
    }
    const postData = {
      title,
      imageUrl,
      subTitle,
      editorContent,
      keywords,
      name: userDetails.name,
      email: userDetails.email,
      content: editorContent,
      date: new Date().toISOString(),
    };
    if (isUpdatePostActive) {
      const response = await updatePost(
        postId,
        title,
        imageUrl,
        subTitle,
        editorContent,
        keywords,
        userDetails.name,
        userDetails.email,
        userDetails.jwt
      );
      console.log({ response });
    } else {
      const response = await createPost(
        title,
        imageUrl,
        subTitle,
        editorContent,
        keywords,
        userDetails.name,
        userDetails.email,
        userDetails.jwt
      );
      console.log({ response });
    }

    setisPostingContent(false);
    setshowToast(true);

    console.log("Post Data:", postData);
  };
  const [showToast, setshowToast] = useState(false);
  return (
    <div>
      <div className={`cp-parent`}>
        <div>
          <div className="cp-header">
            <div className="cp-header-mid cp-container">
              <button
                className="cp-dashboardBtn"
                onClick={(e) => {
                  nav("/dashboard");
                }}
              >
                Dashboard
              </button>
            </div>
          </div>
          <form className="cp-body cp-container">
            <textarea
              type="text"
              className="inputTitle max-width"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                console.log(e.target);
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              placeholder="Enter Title"
            ></textarea>
            <textarea
              type="text"
              className="inputSubTitle max-width"
              value={subTitle}
              onChange={(e) => {
                setSubTitle(e.target.value);
                e.target.style.height = e.target.scrollHeight + "px";
              }}
              placeholder="Enter subtitle"
            ></textarea>
            <div className="customEditor">
              <div ref={editorRef} style={{ height: "300px" }} />
            </div>
          </form>
          <div className="cp-footer">
            <div className="cp-footer-mid cp-container">
              <div className="cp-footer-mid-left">
                <p>Last save</p>
                <p>March 2025</p>
              </div>
              <div className="cp-footer-mid-right">
                {/* <button
                  className='cp-settingBtn'
                  onClick={(e) => {
                    setisShowEditor(true);
                  }}>
                  Setting
                </button> */}
                <button
                  className="cp-postBtn"
                  onClick={(e) => {
                    // handlePostSubmit(e);
                    setisShowEditor(true);
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isShowEditor ? (
        <div className="cp-parent-setting">
          <div className="cp-setting-header cp-container">
            <h2 className="cp-setting-title">Post Setting</h2>
            <div
              className="cp-setting-closeBtn"
              onClick={(e) => {
                setisShowEditor(false);
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                  fill="black"
                />
              </svg>
            </div>
          </div>
          <div className="cp-setting-postPreview cp-container">
            <div className="cp-setting-postPreviewTitle">
              <h3 className="cp-setting-postPreviewText">Featured image</h3>
              <button className="cp-setting-postPreviewEditBtn">Edit</button>
            </div>
            <div className="cp-setting-postCard">
              {imageUrl.length <= 0 ? (
                <div className="cp-setting-imgPlaceholder">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M26.6667 3.33333V26.6667H3.33333V3.33333H26.6667ZM26.6667 0H3.33333C1.5 0 0 1.5 0 3.33333V26.6667C0 28.5 1.5 30 3.33333 30H26.6667C28.5 30 30 28.5 30 26.6667V3.33333C30 1.5 28.5 0 26.6667 0ZM18.5667 14.7667L13.5667 21.2167L10 16.9L5 23.3333H25L18.5667 14.7667Z"
                      fill="black"
                      fillOpacity="0.12"
                    />
                  </svg>
                </div>
              ) : (
                <div className="cp-setting-imgUpload">
                  <img id="editPostImg" src={imageUrl} />
                </div>
              )}
              <div className="cp-setting-postCard-body">
                <h3 className="cp-setting-postCard-title">{title}</h3>
                <p className="cp-setting-postCard-postBody">{subTitle}</p>
                <p className="cp-setting-postCard-footer">
                  <span className="cp-setting-postCard-author">
                    {" "}
                    {userDetails?.name}{" "}
                  </span>
                  <span className="cp-setting-postCard-date">May 13</span>
                </p>
              </div>
            </div>
            <div className="cp-setting-featuredPost-CTAs">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="cp-setting-dangerZone cp-container">
            <div className="cp-setting-dangerZone-header">
              <h3 className="cp-setting-dangerZone-headerText">
                Keywords seperated by ","
              </h3>
            </div>
            <textarea
              type="text"
              value={keywords}
              onChange={(e) => {
                setKeyWords(e.target.value);
              }}
            />
          </div>
          <div className="cp-setting-dangerZone cp-container">
            <div className="cp-setting-dangerZone-header">
              <h3 className="cp-setting-dangerZone-headerText">Danger zone</h3>
            </div>
            <button className="cp-setting-dangerZone-deletePostCTA">
              Delete post
            </button>
          </div>{" "}
          <div className="cp-footer">
            <div className="cp-footer-mid cp-container">
              <div className="cp-footer-mid-left">
                <p>Last save</p>
                <p>March 2025</p>
              </div>
              <div className="cp-footer-mid-right">
                {/* <button
                  className='cp-settingBtn'
                  onClick={(e) => {
                    setisShowEditor(true);
                  }}>
                  Setting
                </button> */}
                <button
                  className="cp-postBtn"
                  disabled={
                    imageUrl.length <= 1 ||
                    keywords.length <= 1 ||
                    title.length <= 1 ||
                    isPostingContent
                  }
                  onClick={(e) => {
                    setisPostingContent(true);

                    handlePostSubmit(e);
                  }}
                >
                  {isUpdatePostActive ? "Update Post" : "Post"}
                </button>
                {isPostingContent && (
                  <Spinner
                    animation="border"
                    style={{ marginLeft: "12px" }}
                    size="sm"
                    className="spinner"
                    variant="dark"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <Modal
        show={showToast}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Post {isUpdatePostActive ? "Updated" : "Created!"}!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              setshowToast(false);
              nav("/dashboard");
            }}
          >
            Go to dashboard
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PostEditor;
