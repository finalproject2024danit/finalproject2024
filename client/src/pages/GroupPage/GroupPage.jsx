import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroupById, fetchGroups } from "../../redux/slices/groupSlice.js";
import {
  createPost,
  updatePost,
  confirmDeletePost,
  toggleLike,
} from "../../utils/postUtils.js";
import {  
  // handleFetchComments,
  // handleSubmitComment,
  // handleDeleteComment,
} from "../../utils/commentsUtils.js";
import styles from "./GroupPage.module.scss";
import MainContent from "../../components/MainContent/MainContent";
import { setComments, fetchComments, fetchNewComment, removeComment } from "../../redux/slices/commentsSlice.js";
import LikeIcon from "../../svg/Header/Like/index.jsx";
import { useParams } from "react-router-dom";
import ButtonDeleteFriend from "../../components/ButtonDeleteFriend/index.jsx";
import ModalPost from "../../components/Modal/ModalGroup/ModalPost.jsx";
import Modal from "../../components/Modal/ModalFriend/Modal.jsx";
import { format } from "date-fns";


const GroupPage = () => {
  const dispatch = useDispatch();
  const userFromId = useSelector((state) => state.user);
  const { groups, loading, selectedGroup } = useSelector(
    (state) => state.group
  );
  const comments = useSelector((state) => state.comments.comments);
  // const { comments = {} } = useSelector((state) => state.comments || {});
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
  const [isDeleteCommentModalOpen, setIsDeleteCommentModalOpen] =
    useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  // const [isExpanded, setIsExpanded] = useState(false);
  const [expandedPosts, setExpandedPosts] = useState({}); 
const [groupToDelete, setGroupToDelete] = useState(null);

  const handleCreatePost = () => {
    createPost(dispatch, selectedGroup, userFromId, newPost, handleCloseModal);
    setNewPost({ content: "" });
  };

  const handleUpdatePost = () => {
    updatePost(dispatch, editPost, setEditPost, setIsModalOpen);
  };

  const handleConfirmDeletePost = () => {
    confirmDeletePost(dispatch, postToDelete, handleCloseDeleteModal);
  };

  const handleLikeClick = (postId) => {
    toggleLike(postId, setLikeStates);
  };

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

  const sortedPosts = selectedGroup?.posts
    ? [...selectedGroup.posts].reverse()
    : [];

  // const handleEditPost = (post) => {
  //   setEditPost(post);
  //   setIsModalOpen(true);
  // };

  const handleOpenDeleteModal = (postId) => {
    setPostToDelete(postId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setPostToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const toggleExpand = (postId) => { 
    console.log("Fetching comments for post:", postId);
    dispatch(fetchComments({postId}))     
    // console.log("Fetching comments for post ID:", postId, "Current state:", comments);
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
    // console.log("Expanded posts state:", expandedPosts);
  };
  // useEffect(() => {
  //   console.log("Updated comments state after fetch:", comments);
  // }, [comments]);
  

  // Відкриваємо модальне вікно при натисканні на кнопку видалення коментаря
  const handleOpenDeleteCommentModal = (commentId, postId, groupId) => {
    setCommentToDelete(commentId);
    setPostToDelete(postId);
    setGroupToDelete(groupId);
    setIsDeleteCommentModalOpen(true);
  };

  // Закриваємо модальне вікно
  const handleCloseDeleteCommentModal = () => {
    setCommentToDelete(null); // Очищаємо інформацію про коментар
    setIsDeleteCommentModalOpen(false); // Закриваємо модальне вікно
  };

  const handleRemoveComment = () => {
    if (!commentToDelete) {
      console.error("Comment ID is missing");
      return;
    }
    console.log("Deleting comment for postId:", postToDelete, "commentId:", commentToDelete);
    dispatch(removeComment({ postId: postToDelete, commentId: commentToDelete }));
    handleCloseDeleteCommentModal(); // Закрити модальне вікно після видалення
  };


  // const handleRemoveComment = () => {
  //   if (commentToDelete) {
  //     dispatch(removeComment(commentToDelete.commentId))
  //       .then((response) => {
  //         console.log('Comment deleted:', response);
  //         handleCloseDeleteCommentModal();
  //         dispatch(fetchComments({ postId: commentToDelete.postId }));
  //       })
  //       .catch((error) => console.error('Error deleting comment:', error));
  //   }
  // };

  // const handleRemoveComment = () => {
  //   dispatch(removeComment(commentToDelete.commentId)).then(() => {
  //     handleCloseDeleteCommentModal();
  //   });
  // };
  
  const handleCommentChangeWrapper = (postId, event) => {
    handleCommentChange(postId, event, setCommentValues);
  };
  
  const fetchNewCommentWrapper = (postId, content, userId) => {    
    if (!content) return; // Перевірка, щоб уникнути порожніх коментарів
    dispatch(fetchNewComment({ postId, userId, content }));    
    setCommentValues((prev) => ({ ...prev, [postId]: "" })); // Очищаємо поле коментаря
  };
  

  const handleCommentChange = (postId, event) => {
    const { value } = event.target;
    setCommentValues((prevValues) => ({
      ...prevValues,
      [postId]: value,
    }));
  };

  useEffect(() => {
    if (selectedGroup) {
      selectedGroup.posts.forEach(post => {
        fetchComments(selectedGroup.id, post.id, dispatch);
      });
    }
  }, [selectedGroup, dispatch]);

  
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
                sortedPosts.map(post => {
                  const postComments =
                    comments[post.id] || [];
                  const { liked = false, likes = 0 } =
                    likeStates[post.id] || {};

                  return (
                    <div key={post.id} className={styles.post}>
                      <p>{post.content}</p>
                      <div className={styles.postActions}>
                        {/* <button
                          className={styles.editButton}
                          onClick={() => handleEditPost(post)}
                        >
                          Edit
                        </button> */}
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
                          fetchNewCommentWrapper(post.id, commentValues[post.id], userFromId.id); // Передаємо тільки необхідні дані
                        }}
                        className={styles.commentForm}
                      >
                        <div className={styles.commentsList}>
                          {postComments.length > 0 ? (
                            postComments.map((comment) => (
                              <div key={comment.id} className={styles.comment}>
                                <div className={styles.commentHeader}>
                                  <div className={styles.commentInfo}>
                                    <img
                                      src={
                                        comment.userAvatar ||
                                        "defaultAvatar.jpg"
                                      }
                                      alt={`${comment.userName} ${comment.userLastName}`}
                                      className={styles.commentAvatar}
                                    />
                                    <span className={styles.commentAuthor}>
                                      {/* {comment.userName} {comment.userLastName} */}
                                      User {comment.userId}
                                    </span>
                                  </div>
                                  <span className={styles.commentDate}>
                                    {format(
                                      new Date(comment.createdDate),
                                      "dd.MM.yyyy"
                                    )}
                                  </span>
                                  <ButtonDeleteFriend
                                    className={styles.deleteButton}
                                    onClick={() => {
                                        handleOpenDeleteCommentModal(
                                        comment.id,
                                        post.id,
                                        selectedGroup.id
                                      );
                                    }}
                                  />
                                </div>
                                <p>{comment.content}</p>
                              </div>
                            ))
                          ) : (
                            <p>No comments yet.</p>
                          )}
                        </div>
                        <button
                          className={styles.toggleButton}
                          onClick={() => toggleExpand(post.id)}
                          aria-label="Toggle Comments"
                          type="button"
                        >
                          <span>Comments</span>
                          {expandedPosts[post.id] ? "⬆" : "⬇"}
                        </button>

                        {expandedPosts[post.id] && (
                          <div className={styles.commentSection}>
                            <textarea
                              name={`comment-${post.id}`}
                              onChange={(e) => handleCommentChangeWrapper(post.id, e)}
                              value={commentValues[post.id] || ""}
                              placeholder="Write a comment..."
                              className={styles.commentTextarea}
                            />
                            <button className={styles.groupBtn} type="submit">
                              Send the comment
                            </button>
                          </div>
                        )}
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
      <Modal
        isOpen={isDeleteCommentModalOpen}
        onClose={handleCloseDeleteCommentModal}
        onConfirm={handleRemoveComment}
        message="Are you sure you want to delete this comment?" 
      />
    </MainContent>
  );
};

export default GroupPage;




