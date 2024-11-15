import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { AllPosts } from "../components/AllPosts";
import { NavBar } from "../components/nav/NavBar";
import { PostDetails } from "../components/PostDetails";
import { NewPost } from "../components/NewPost";
import { MyPosts } from "../components/MyPosts";
import { Profiles } from "../components/Profiles";
import { EditProfile } from "../components/EditProfile";

export const ApplicationViews = () => {
  const [activeUser, setActiveUser] = useState({});

  useEffect(() => {
    const localUser = localStorage.getItem("learning_user");
    const localUserObject = JSON.parse(localUser);
    setActiveUser(localUserObject);
  }, []);

  return (
    <Routes>
      {/* Route for "/all-posts" with nested routes */}
      <Route
        path="/"
        element={
          <>
            <NavBar activeUser={activeUser} />
            <Outlet />
          </>
        }
      >
        {/* Default element for /all-posts */}
        <Route index element={<AllPosts activeUser={activeUser} />} />
        <Route path="all-posts">
          <Route
            index
            element={<AllPosts activeUser={activeUser} favorites={false} />}
          />
          {/* Nested route for individual post details */}
          <Route
            path=":postId"
            element={<PostDetails activeUser={activeUser} />}
          />
        </Route>
        <Route path="new-post" element={<NewPost activeUser={activeUser} />} />
        <Route path="my-posts" element={<MyPosts activeUser={activeUser} />} />
        <Route
          path="edit-post/:postId"
          element={<NewPost activeUser={activeUser} />}
        />
        <Route
          path="favorites"
          element={<AllPosts activeUser={activeUser} favorites={true} />}
        />
        <Route
          path="profile/:userId"
          element={<Profiles activeUser={activeUser} />}
        />
        <Route
          path="edit-profile"
          element={<EditProfile activeUser={activeUser} />}
        />
      </Route>
    </Routes>
  );
};
