import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = ({ activeUser }) => {
  const navigate = useNavigate();
  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link className="navbar-link" to={"all-posts"}>
          All Posts
        </Link>
      </li>

      <li className="navbar-item">
        <Link className="navbar-link" to={"new-post"}>
          New Post
        </Link>
      </li>

      <li className="navbar-item">
        <Link className="navbar-link" to={"my-posts"}>
          My Posts
        </Link>
      </li>

      <li className="navbar-item">
        <Link className="navbar-link" to={"favorites"}>
          Favorites
        </Link>
      </li>

      <li className="navbar-item">
        <Link className="navbar-link" to={`profile/${activeUser.id}`}>
          Profile
        </Link>
      </li>

      {localStorage.getItem("learning_user") ? (
        <li className="navbar-item navbar-logout">
          <Link
            className="navbar-link"
            to=""
            onClick={() => {
              localStorage.removeItem("learning_user");
              navigate("/login", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};
