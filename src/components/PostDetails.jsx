import "./PostDetails.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostByPostId } from "../services/getAllPosts";
import { addFavorite, deleteFavorite } from "../services/favoritesService";

export const PostDetails = ({ activeUser }) => {
  const [post, setPost] = useState(null); // Set initial state to null
  const { postId } = useParams();

  const handleUnFavorite = async () => {
    await deleteFavorite(activeUser.id, post.id);
    await getAndSetAllPosts();
  };

  const handleFavorite = async () => {
    await addFavorite(activeUser.id, post.id);
    await getAndSetAllPosts();
  };

  const getAndSetAllPosts = () => {
    getPostByPostId(postId).then((fetchedPost) => {
      console.log("Fetched post:", fetchedPost);
      setPost(fetchedPost);
    });
  };

  useEffect(() => {
    getAndSetAllPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  if (!post) return <div>Loading...</div>; // Add loading indicator

  return (
    <div className="page-container">
      <div className="post-details__container">
        <div className="post-details-topic">{post.topic?.name}</div>

        <div className="post-details__header">
          <div className="post-details__title">{post.title}</div>

          {activeUser && post.user && activeUser.id !== post.user.id ? (
            <div className="post-item__likes">
              {!post.postLikes?.find(
                (item) => item.userId === activeUser.id
              ) ? (
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
              <span className="post-item__like-count">
                {post.postLikes?.length || 0}
              </span>
            </div>
          ) : (
            <Link
              to={`/edit-post/${postId}`}
              state={{ editPost: post, edit: true }}
            >
              <button className="post-details__like-button">Edit</button>
            </Link>
          )}
        </div>

        <div className="post-details-details">
          Posted on
          <span className="post-details-date">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          by
          <Link to={`/profile/${post.user?.id}`}>
            <span className="post-details-author">{post.user?.fullName}</span>
          </Link>
        </div>

        <div className="post-details-body">
          {post.body
            ? post.body
                .split("\n")
                .map((line, index) => <p key={index}>{line}</p>)
            : "Loading..."}
        </div>
      </div>
    </div>
  );
};
