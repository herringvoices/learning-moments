import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getUserById } from "../services/userService";

export const Profiles = ({ activeUser }) => {
  let { userId } = useParams();
  userId = parseInt(userId);

  const [user, setUser] = useState({});

  useEffect(() => {
    getUserById(userId).then((prev) => {
      setUser(prev);
    });
  }, [userId]);

  return (
    <div className="page-container">
      <div className="post-details__container">
        <div className="post-details__header">
          <div className="post-details__title">{user.fullName}</div>
          {activeUser.id === userId && (
            <Link to={`/edit-profile`} state={{ editProfile: user }}>
              <button className="post-details__like-button">Edit</button>
            </Link>
          )}
        </div>
        <div className="post-details-body">
          <p>
            {" "}
            <span className="span--pink">Cohort: </span>
            {user.cohort}
          </p>
          <p>
            {" "}
            <span className="span--pink">Number of Posts: </span>
            {user.posts?.length}
          </p>
        </div>
      </div>
    </div>
  );
};
