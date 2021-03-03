import React, { useState, useEffect } from "react";
import axios from "axios";

const SinglePost = (props) => {
  const [post, setPost] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((err) => {
        alert("Error loading single post");
      });
  }, []);
  return (
    <div className="container">
      <h1>{post.title}</h1>
      <p className="lead">{post.content}</p>
      <p>
        Author: <strong>{post.user}</strong> Published on{" "}
        <strong>{new Date(post.createdAt).toLocaleString()}</strong>
      </p>
    </div>
  );
};

export default SinglePost;
