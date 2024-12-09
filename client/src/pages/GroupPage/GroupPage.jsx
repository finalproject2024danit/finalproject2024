import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGroupById,
  fetchGroups,
  addPostToGroup,
  editPost as editPostAction,
  removePost
} from "../../redux/slices/groupSlice.js";
import styles from "./GroupPage.module.scss";
import MainContent from "../../components/MainContent/MainContent";
import { addComment, setComments } from "../../redux/slices/commentsSlice.js";
import LikeIcon from "../../svg/Header/Like/index.jsx";
import { useParams } from "react-router-dom";
import ModalPost from "../../components/Modal/ModalGroup/ModalPost.jsx";
import Modal from "../../components/Modal/ModalFriend/Modal.jsx";
import { format } from 'date-fns';

const GroupPage = () => {
  const dispatch = useDispatch();
  const userFromId = useSelector((state) => state.user);
  const { groups, loading, error, selectedGroup } = useSelector(
    (state) => state.group
  );
  const { comments = {} } = useSelector((state) => state.comments || {});
  const observer = useRef();
  const [page, setPage] = useState(0);
  const [commentValues, setCommentValues] = useState({});
  const [likeStates, setLikeStates] = useState({});
  const perPage = 5;
  const hasMore = groups.length % perPage === 0 && groups.length < 100;
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ content: "" });
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const [editPost, setEditPost] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchGroupById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!hasMore) return;
    dispatch(fetchGroups({ startPage: page, perPage }));
  }, [dispatch, page, hasMore]);

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem("comments")) || {};
    for (const groupId in storedComments) {
      for (const postId in storedComments[groupId]) {
        dispatch(
          setComments({
            groupId,
            postId,
            comments: storedComments[groupId][postId],
          })
        );
      }
    }
  }, [dispatch]);

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem("likes")) || {};
    setLikeStates(storedLikes);
  }, []);

  useEffect(() => {
    localStorage.setItem("likes", JSON.stringify(likeStates));
  }, [likeStates]);

  const lastGroupElementRef = (node) => {
    if (loading || !hasMore) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  };

  const handleGroupClick = (groupId) => {
    dispatch(fetchGroupById(groupId));
  };

  const handleCommentChange = (postId, event) => {
    setCommentValues((prevValues) => ({
      ...prevValues,
      [postId]: event.target.value,
    }));
  };

  const handleSubmitComment = (postId, groupId) => {
    const commentContent = commentValues[postId]?.trim();
    if (!commentContent) return;

    const newComment = {
      content: commentContent,
      postId,
      groupId,
      userId: userFromId.id,
      userName: userFromId.firstName,
      userLastName: userFromId.lastName,
      userAvatar: userFromId.avatar,
      createdDate: new Date().toISOString(),
    };

    dispatch(
      addComment({
        groupId,
        postId,
        comment: newComment,
      })
    );

    const updatedComments = JSON.parse(localStorage.getItem("comments")) || {};
    if (!updatedComments[groupId]) updatedComments[groupId] = {};
    if (!updatedComments[groupId][postId])
      updatedComments[groupId][postId] = [];
    updatedComments[groupId][postId].push(newComment);
    localStorage.setItem("comments", JSON.stringify(updatedComments));

    setCommentValues((prevValues) => ({
      ...prevValues,
      [postId]: "",
    }));
  };

  const handleLikeClick = (postId) => {
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

  if (loading && !groups.length) {
    return (
      <MainContent title="">
        <p>Loading...</p>
      </MainContent>
    );
  }

  if (error) {
    return (
      <MainContent title="">
        <p>{error}</p>
      </MainContent>
    );
  }

  if (!groups.length) {
    return (
      <MainContent title="">
        <p>Groups not found.</p>
      </MainContent>
    );
  }

  const handleCreatePost = () => {
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

    dispatch(
      addPostToGroup({ groupId: selectedGroup.id, postData: newPostData })
    );

    setNewPost({ content: "" });
    handleCloseModal();
  };

  const sortedPosts = selectedGroup?.posts
    ? [...selectedGroup.posts].reverse()
    : [];

  const handleEditPost = (post) => {
    setEditPost(post);
    setIsModalOpen(true);
  };

  const handleUpdatePost = () => {
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

  const handleOpenDeleteModal = (postId) => {
    setPostToDelete(postId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setPostToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDeletePost = () => {
    if (postToDelete) {
      dispatch(removePost(postToDelete))
        .unwrap()
        .then(() => console.log("Post deleted:", postToDelete))
        .catch((err) => console.error("Failed to delete post:", err));
    }
    handleCloseDeleteModal();
  };

  return (
    <MainContent title="">
      <div className={styles.groupContainer}>
        <div className={styles.groupHeader}>
          {Array.from(
            new Map(groups.map((group) => [group.id, group])).values()
          ).map((group, index) => (
            <div
              key={group.id}
              ref={groups.length === index + 1 ? lastGroupElementRef : null}
              className={styles.groupLink}
              onClick={() => handleGroupClick(group.id)}
            >
              <h2>{group.name}</h2>
              <img
                src={group.photo || "defaultAvatarGroup.jpg"}
                alt={`${group.name} Avatar`}
                className={styles.avatar}
              />
            </div>
          ))}
        </div>

        {selectedGroup && (
          <div className={styles.groupDetails}>
            <h2>{selectedGroup.name}</h2>
            <p>{selectedGroup.description}</p>
            <button className={styles.groupBtn} onClick={handleOpenModal}>
              New Post
            </button>
            <div className={styles.groupRender}>
              {sortedPosts.length > 0 ? (
                sortedPosts.map((post, index) => {
                  const postComments =
                    comments[selectedGroup.id]?.[post.id] || [];
                  const { liked = false, likes = 0 } =
                    likeStates[post.id] || {};

                  return (
                    <div key={index} className={styles.post}>
                      <p>{post.content}</p>
                      <div className={styles.postActions}>
                        <button
                          className={styles.editButton}
                          onClick={() => handleEditPost(post)}
                        >
                          Edit
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={() => handleOpenDeleteModal(post.id)}
                        >
                          Delete
                        </button>
                      </div>
                      <div className={styles.postFeedback}>
                        <div className={styles.likes}>
                          <LikeIcon
                            liked={liked}
                            onClick={() => handleLikeClick(post.id)}
                          />{" "}
                          {likes}
                        </div>
                        <div className={styles.comments}>
                          Comments: {postComments.length}
                        </div>
                      </div>
                      <form
                        onSubmit={(event) => {
                          event.preventDefault();
                          handleSubmitComment(post.id, selectedGroup.id);
                        }}
                        className={styles.commentForm}
                      >
                        <div className={styles.commentsList}>
                          {postComments.length > 0 ? (
                            postComments.map((comment, idx) => (
                              <div key={idx} className={styles.comment}>
                                <div className={styles.commentHeader}>
                                  <img
                                    src={
                                      comment.userAvatar || "defaultAvatar.jpg"
                                    }
                                    alt={`${comment.userName} ${comment.userLastName}`}
                                    className={styles.commentAvatar}
                                  />
                                  <span className={styles.commentAuthor}>
                                    {comment.userName} {comment.userLastName}
                                  </span>
                                </div>
                                <p>{comment.content}</p>
                                <span className={styles.commentDate}>
                                  {format(new Date(comment.createdDate), 'dd.MM.yyyy')}
                                </span>
                              </div>
                            ))
                          ) : (
                            <p>No comments yet.</p>
                          )}
                        </div>
                        <textarea
                          name={`comment-${post.id}`}
                          onChange={(e) => handleCommentChange(post.id, e)}
                          value={commentValues[post.id] || ""}
                          placeholder="Write a comment..."
                        />
                        <button className={styles.groupBtn} type="submit">
                          Send the comment
                        </button>
                      </form>
                    </div>
                  );
                })
              ) : (
                <p>No posts found.</p>
              )}
            </div>
          </div>
        )}
      </div>
      <ModalPost
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={editPost ? handleUpdatePost : handleCreatePost}
        newPost={editPost || newPost}
        setNewPost={editPost ? setEditPost : setNewPost}
      />
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDeletePost}
        message="Are you sure you want to delete this post?"
      />
    </MainContent>
  );
};

export default GroupPage;
