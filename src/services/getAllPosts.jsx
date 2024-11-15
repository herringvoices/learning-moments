export const getAllPosts = () => {
  return fetch(
    `http://localhost:8088/posts?_expand=topic&_expand=user&_embed=postLikes`
  ).then((res) => res.json());
};

export const getPostByPostId = (postId) => {
  return fetch(
    `http://localhost:8088/posts/${postId}?_expand=topic&_expand=user&_embed=postLikes`
  ).then((res) => res.json());
};
