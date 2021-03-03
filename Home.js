import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    axios
      .get(`${process.env.REACT_APP_API}/posts`)
      .then((response) => {
        console.log(response);
        setPosts(response.data);
      })
      .catch((err) => {
        alert("Error fetching posts");
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const deleteConfirm = (slug) => {
    let answer = window.confirm("Are you sure you want to delete this post?");
    if (answer) {
      deletePost(slug);
    }
  };

  const deletePost = (slug) => {
    //console.log("delete", slug, "post");
    axios
      .delete(`${process.env.REACT_APP_API}/post/${slug}`)
      .then((response) => {
        alert(response.data.message);
        fetchPosts();
      })
      .catch((err) => {
        alert("Error delete this post");
      });
  };

  return (
    <div className="container">
      <h1>MERN CRUD</h1>
      {posts.map((post, i) => (
        <div className="row" key={i}>
          <div className="col pt-3 pb-2">
            <div className="row">
              <div className="col-md-10">
                <Link to={`/post/${post.slug}`}>
                  <h2>{post.title}</h2>
                </Link>
                <p className="lead">{post.content.substring(0, 100)}</p>
                <p>
                  Author: <strong>{post.user}</strong> Published on{" "}
                  <strong>{new Date(post.createdAt).toLocaleString()}</strong>
                </p>
              </div>
              <div className="col-md-2">
                <Link
                  to={`/post/update/${post.slug}`}
                  className="btn btn-sm btn-outline-warning"
                >
                  Update
                </Link>

                <button
                  onClick={() => deleteConfirm(post.slug)}
                  className="btn btn-sm btn-outline-danger ml-1"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
