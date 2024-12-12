import { addPostToGroup, editPost as editPostAction, removePost } from "../redux/slices/groupSlice.js";

// Створення нового поста
export const createPost = (dispatch, selectedGroup, userFromId, newPost, handleCloseModal) => {
  if (!newPost.content.trim()) {
    alert("Content is required.");
    return;
  }

  if (!selectedGroup || !selectedGroup.id) {
    alert("Selected group is not available. Please try again later.");
    return;
  }

  if (!userFromId || !userFromId.id) {
    alert("User ID is not available. Please log in again.");
    return;
  }

  const newPostData = {
    id: Date.now(),
    content: newPost.content,
    groupId: selectedGroup.id,
    userId: userFromId.id,
    createdDate: new Date().toISOString(),
  };

  dispatch(addPostToGroup({ groupId: selectedGroup.id, postData: newPostData }));
  handleCloseModal();
};

// Редагування поста
export const updatePost = (dispatch, editPost, setEditPost, setIsModalOpen) => {
  if (!editPost || !editPost.id || !editPost.content.trim()) {
    alert("Invalid post data. Please check the content and try again.");
    console.error("Invalid post data:", editPost);
    return;
  }

  dispatch(
    editPostAction({
      postId: editPost.id,
      postData: { content: editPost.content },
    })
  )
    .unwrap()
    .then(() => {
      setEditPost(null);
      setIsModalOpen(false);
    })
    .catch((err) => {
      console.error("Failed to update post:", err);
    });
};

// Видалення поста
export const confirmDeletePost = (dispatch, postToDelete, handleCloseDeleteModal) => {
  if (postToDelete) {
    dispatch(removePost(postToDelete))
      .unwrap()
      .then(() => console.log("Post deleted:", postToDelete))
      .catch((err) => console.error("Failed to delete post:", err));
  }
  handleCloseDeleteModal();
};

// Лайк поста
export const toggleLike = (postId, setLikeStates) => {
  setLikeStates((prevStates) => {
    const isLiked = prevStates[postId]?.liked || false;
    const likes = prevStates[postId]?.likes || 0;

    return {
      ...prevStates,
      [postId]: {
        liked: !isLiked,
        likes: isLiked ? likes - 1 : likes + 1,
      },
    };
  });
};
