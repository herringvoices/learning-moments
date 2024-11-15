import { useState, useEffect } from "react";
import { PostItem } from "./PostItem";
import { getAllPosts } from "../services/getAllPosts";
import { getTopics } from "../services/getTopics";
import "./AllPosts.css";

export const MyPosts = ({ activeUser }) => {
  const [searchText, setSearchText] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const [allTopics, setAllTopics] = useState([]);
  const [topic, setTopic] = useState(0);

  const getAndSetAllPosts = () => {
    getAllPosts().then((postArray) => setAllPosts(postArray));
    getTopics().then((topicsArray) => setAllTopics(topicsArray));
  };

  useEffect(getAndSetAllPosts, []);

  useEffect(() => {
    const foundPosts = allPosts.filter((post) => {
      const matchesUser = post.userId === activeUser.id;
      const matchesTopic = topic ? post.topic.id === topic : true;
      const matchesSearch = post.title
        .toLowerCase()
        .includes(searchText.toLowerCase());
      return matchesTopic && matchesSearch && matchesUser;
    });
    setFilteredPosts(foundPosts);
  }, [allPosts, topic, searchText, activeUser]);

  return (
    <div className="page-container">
      <div className="post-list__container">
        <header className="post-list__header">
          <select
            className="post-list__topic-selector"
            value={topic}
            onChange={(event) => {
              setTopic(parseInt(event.target.value));
            }}
          >
            <option key={0} value={0}>
              All Topics
            </option>
            {allTopics.map((topicItem) => (
              <option key={topicItem.id} value={topicItem.id}>
                {topicItem.name}
              </option>
            ))}
          </select>
          <input
            className="post-list__search-input"
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </header>
        <ul>
          {filteredPosts.map((item) => (
            <PostItem
              getAndSetAllPosts={getAndSetAllPosts}
              key={item.id}
              post={item}
              activeUser={activeUser}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
