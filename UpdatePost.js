import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

const UpdatePost = (props) => {
  const [state, setState] = useState({
    title: "",
    content: "",
    slug: "",
    user: "",
  });

  const { title, content, slug, user } = state;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
      .then((response) => {
        const { title, content, slug, user } = response.data;
        setState({ ...state, title, content, slug, user });
      })
      .catch((err) => {
        alert("Error loading single post");
      });
  }, []);

  const handleChange = (name) => (e) => {
    setState({ ...state, [name]: e.target.value });
  };
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    // access data from backend
    axios
      .put(`${process.env.REACT_APP_API}/post/${slug}`, {
        title,
        content,
        user,
      })
      .then((response) => {
        console.log(response);
        const { title, content, slug, user } = response.data;
        setState({ ...state, title, content, slug, user });
        alert(`${title} is updated`);
        history.push("/");
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div className="container pb-5">
      <h1>Update Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="text-muted">Title</label>
          <input
            onChange={handleChange("title")}
            value={title}
            type="text"
            className="form-control"
            placeholder="Post Title"
            required
          />
        </div>
        <br />
        <div className="form-group">
          <label className="text-muted">Content</label>
          <textarea
            onChange={handleChange("content")}
            value={content}
            type="text"
            className="form-control"
            placeholder="Write something.."
            required
          />
        </div>
        <br />
        <div className="form-group">
          <label className="text-muted">User</label>
          <input
            onChange={handleChange("user")}
            value={user}
            type="text"
            className="form-control"
            placeholder="Your name"
            required
          />
        </div>
        <br />
        <div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;
