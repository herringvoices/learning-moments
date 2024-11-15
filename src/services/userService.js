export const getUserByEmail = (email) => {
  return fetch(`http://localhost:8088/users?email=${email}`).then((res) =>
    res.json()
  );
};

export const createUser = (user) => {
  return fetch("http://localhost:8088/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};

export const getUserById = (userId) => {
  return fetch(`http://localhost:8088/users/${userId}?_embed=posts`).then(
    (res) => res.json()
  );
};

export const updateUser = async (user) => {
  const response = await fetch(`http://localhost:8088/users/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (response.ok) {
    const updatedUser = await response.json();
    console.log("User updated successfully:", updatedUser);
    return updatedUser;
  } else {
    console.error("Failed to update user:", response.statusText);
  }
};
