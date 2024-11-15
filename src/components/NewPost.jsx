import { useEffect, useState } from "react";
import { getTopics } from "../services/getTopics";
import "./NewPost.css";
import { saveNewPost, updatePost } from "../services/savePost";
import { useNavigate, useLocation } from "react-router-dom";

export const NewPost = ({ activeUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Destructure the state passed from Link, with default values if not provided
  const { editPost, edit } = location.state || {};

  const [allTopics, setAllTopics] = useState([]);
  const [post, setPost] = useState({});

  useEffect(() => {
    setPost({
      title: edit ? editPost.title : "",
      body: edit ? editPost.body : "",
      date: edit ? editPost.date : new Date(),
      userId: activeUser.id,
      topicId: edit ? editPost.topicId : 0,
    });
  }, [activeUser, edit, editPost]);

  useEffect(() => {
    getTopics().then((topicsArray) => setAllTopics(topicsArray));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setPost((prevPost) => ({
      ...prevPost,
      [name]: name === "topicId" ? parseInt(value) || 0 : value, // Use parseInt for topicId, keep string otherwise
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!post.title || !post.topicId || !post.body) {
      alert("Make sure you've got a title, topic, and post before submitting.");
    } else {
      edit ? await updatePost(post) : await saveNewPost(post);
      navigate("/my-posts");
    }
  };

  return (
    <div className="page-container">
      <div className="post-list__container">
        <header className="post-list__header">
          <input
            onChange={handleInputChange}
            value={post.title}
            name="title"
            className="post-list__search-input"
            type="text"
          />
          <select
            className="post-list__topic-selector"
            value={post.topicId}
            name="topicId"
            onChange={handleInputChange}
          >
            <option key={0} value={0}>
              Select a topic
            </option>
            {allTopics.map((topicItem) => (
              <option key={topicItem.id} value={topicItem.id}>
                {topicItem.name}
              </option>
            ))}
          </select>
        </header>
        <textarea
          className="new-post__body"
          onChange={handleInputChange}
          name="body"
          value={post.body}
          placeholder="Write your insights here..."
        ></textarea>
        <button onClick={handleSubmit} className="btn-big">
          {edit ? "Save" : "Submit"}
        </button>
      </div>
    </div>
  );
};
