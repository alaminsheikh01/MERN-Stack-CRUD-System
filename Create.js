import React, { useState } from "react";
import axios from "axios";

const Create = () => {
  // main state
  const [state, setState] = useState({
    title: "",
    content: "",
    user: "",
  });

  // destructring state value
  const { title, content, user } = state;

  const handleChange = (name) => (e) => {
    setState({ ...state, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // access data from backend
    axios
      .post(`${process.env.REACT_APP_API}/post`, { title, content, user })
      .then((response) => {
        console.log(response);
        setState({ ...state, title: "", content: "", user: "" });
        alert(`Post Title ${response.data.title} is created`);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div className="container p-5">
      <h1>CREATE POST</h1>
      <br />
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
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
