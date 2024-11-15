export const deleteFavorite = async (userId, postId) => {
  try {
    // Fetch the postLikes array and find the entry that matches userId and postId
    const response = await fetch(
      `http://localhost:8088/postLikes?userId=${userId}&postId=${postId}`
    );
    const data = await response.json();

    // Check if the postLike entry exists
    if (data.length > 0) {
      const postLikeId = data[0].id;

      //Delete the postLike entry by its id
      await fetch(`http://localhost:8088/postLikes/${postLikeId}`, {
        method: "DELETE",
      });
      console.log(`Deleted postLike with id: ${postLikeId}`);
    } else {
      console.log("No matching postLike entry found");
    }
  } catch (error) {
    console.error("Error deleting postLike:", error);
  }
};


//POST fetch for if the user wants to favorite a post:
export const addFavorite = async (userId, postId) => {
  try {
    const response = await fetch("http://localhost:8088/postLikes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        postId: postId,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add favorite");
    }

    const newFavorite = await response.json();
    console.log("Favorite added:", newFavorite);
    return newFavorite;
  } catch (error) {
    console.error("Error adding favorite:", error);
  }
};
