import React from "react";
import "./postCard.css";
import { FaEdit, FaRegEdit, FaRegTrashAlt, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { formatcreatedTime } from "../../utils/formatCreatedTime";
import { FaDeleteLeft } from "react-icons/fa6";
import { CiTrash } from "react-icons/ci";
// import { deletePost } from "../../apis/api";
function PostCard({
  imgUrl,
  draft = false,
  isPublic = false,
  title = "Untitled",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam mollis, sapien ac egestas ultricies, metus odio vehicula nulla.",
  createdTime = new Date().getTime(),
  handleDeletePost,
  id = 0,
}) {
  const nav = useNavigate();

  return (
    <div>
      <div
        className="card"
        style={{ cursor: isPublic ? "pointer" : "default" }}
        onClick={() => {
          if (isPublic) {
            nav(`/postPreview/${id}`);
          }
        }}
      >
        <div className="img">
          <img src={imgUrl} />

          {draft ? "Draft" : ""}
        </div>
        <div className="body">
          <div className="titleHandler">
            <h3>{title}</h3>
          </div>
          <p className="Pbody">{description}</p>
          <div className="bottom">
            <div className="leftBottom">
              <div className="date">
                <p>{formatcreatedTime(createdTime)}</p>
              </div>
            </div>
            {!isPublic && (
              <FaRegEdit
                className="rightBottom"
                onClick={(e) => {
                  nav(`/post/edit/${id}`);
                }}
              />
            )}{" "}
            {!isPublic && (
              <FaRegTrashAlt
                className="rightBottom delete"
                onClick={(e) => {
                  if (window.confirm("Are you sure you want to delete?")) {
                    handleDeletePost(id);
                  }
                }}
              />
            )}{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
