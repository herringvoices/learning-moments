export const saveNewPost = async (post) => {
  try {
    const response = await fetch("http://localhost:8088/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to POST: ${response.statusText}. ${errorData.message || ""}`
      );
    }
  } catch (error) {
    console.error("Error:", error); // Logs only errors for debugging
    throw error; // Re-throw error to be handled in the calling component, if necessary
  }
};

export const updatePost = async (post) => {
  try {
    const response = await fetch(`http://localhost:8088/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to PUT: ${response.statusText}. ${errorData.message || ""}`
      );
    }
  } catch (error) {
    console.error("Error:", error); // Logs only errors for debugging
    throw error; // Re-throw error to be handled in the calling component, if necessary
  }
};
