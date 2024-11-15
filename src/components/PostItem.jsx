import { Link } from "react-router-dom";
import "./PostItem.css";
import { deletePost } from "../services/deletePost";
import { addFavorite, deleteFavorite } from "../services/favoritesService";

export const PostItem = ({ getAndSetAllPosts, post, activeUser }) => {
  //   const [favorites, setFavorites] = useState([]);

  const handleDelete = () => {
    deletePost(post.id).then(() => {
      getAndSetAllPosts();
    });
  };

  const handleUnFavorite = async () => {
    await deleteFavorite(activeUser.id, post.id);
    await getAndSetAllPosts();
  };

  const handleFavorite = async () => {
    await addFavorite(activeUser.id, post.id);
    await getAndSetAllPosts();
  };

  return (
    // Container for each post item in a list
    <li className="post-item__container">
      {/* Display the topic name at the top of the post item */}
      <div className="post-item__header">{post.topic.name}</div>

      <div className="post-item__content">
        <div>
          {/* Link to the individual post page using the post's ID */}
          <Link className="post-item__title" to={`/all-posts/${post.id}`}>
            {post.title}
          </Link>
        </div>

        {/* Conditionally render based on whether an activeUser exists and if they are not the post owner */}
        {activeUser && activeUser.id !== post.user.id ? (
          <div className="post-item__likes">
            {/* Like button toggles heart icon based on whether the active user has liked the post */}

            {/* Check if the active user has liked the post already, conditionally render heart icon */}
            {!post.postLikes.find((item) => item.userId === activeUser.id) ? (
              <button
                className="post-item__like-button"
                onClick={handleFavorite}
              >
                <i className="fa-regular fa-heart"></i>
              </button>
            ) : (
              <button
                className="post-item__like-button"
                onClick={handleUnFavorite}
              >
                <i className="fa-solid fa-heart"></i>
              </button>
            )}

            {/* Display the total like count */}
            <span className="post-item__like-count">
              {post.postLikes.length}
            </span>
          </div>
        ) : (
          // If the active user is the post owner, display a delete (trash) icon button instead of a like button
          <button onClick={handleDelete} className="post-item__like-button">
            <i className="fa-solid fa-trash-can"></i>
          </button>
        )}
      </div>
    </li>
  );
};
