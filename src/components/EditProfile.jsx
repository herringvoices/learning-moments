import { useEffect, useState } from "react";
import { getUserById, updateUser } from "../services/userService";
import { useNavigate } from "react-router-dom";

export const EditProfile = ({ activeUser }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getUserById(activeUser.id).then((prev) => {
      setUser({
        id: prev.id,
        email: prev.email,
        fullName: prev.fullName,
        cohort: prev.cohort,
      });
    });
  }, [activeUser]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser((prevPost) => ({
      ...prevPost,
      [name]: name !== "fullName" ? parseInt(value) || 0 : value, // Use parseInt for anything that isn't the fullName
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser(user).then(() => {
      navigate(`/profile/${user.id}`);
    });
  };

  return (
    <div className="page-container">
      <div className="post-details__container">
        <label htmlFor="fullName">
          <span className="span--pink">Name: </span>
        </label>
        <input
          onChange={handleInputChange}
          value={user.fullName}
          name="fullName"
          id="fullName"
          className="post-list__search-input"
          type="text"
        />
        <br />
        <br />
        <label htmlFor="cohort">
          <span className="span--pink">Cohort: </span>
        </label>
        <input
          onChange={handleInputChange}
          value={user.cohort}
          name="cohort"
          id="cohort"
          className="post-list__search-input"
          type="number"
        />
        <br />
        <br />
        <button onClick={handleSubmit} className="btn-big">
          Save
        </button>
      </div>
    </div>
  );
};
