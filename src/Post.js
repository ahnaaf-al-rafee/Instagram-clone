import { Avatar, Input } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import firebase from "firebase";

import { db } from "./firebase";
import "./Post.css";

function Post({ user, postId, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;

    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post__header">
        {/* username + avatar */}
        <Avatar
          className="post__avatar"
          alt={username}
          src="/static/images/avatar/1.jpg"
        />
        <h4>{username}</h4>
      </div>

      {/* post image */}
      <img className="post__image" alt="" src={imageUrl} />

      {/* username + caption */}
      <p className="post__caption">
        <strong>{username}:</strong> {caption}
      </p>

      <div className="post__comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>

     {
       user && (
        <form className="post__commentBox">
        <Input
          className="post__commentInput"
          type="text"
          placeholder="Add a comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button
          className="post__commentBtn"
          type="submit"
          disabled={!comment}
          onClick={postComment}
        >
          Post
        </button>
      </form>
       )
     }
    </div>
  );
}

export default Post;
