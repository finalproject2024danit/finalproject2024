import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups, fetchGroupById } from "../../redux/slices/groupSlice.js";
import styles from "./GroupPage.module.scss";
import MainContent from "../../components/MainContent/MainContent";
import { setComments, addComment } from "../../redux/slices/commentsSlice.js";
import LikeIcon from "../../svg/Header/Like/index.jsx";

const GroupPage = () => {
  const dispatch = useDispatch();
  const userFromId = useSelector((state) => state.user.id);
  const { groups, loading, error, selectedGroup } = useSelector((state) => state.group);
  const { comments = {} } = useSelector((state) => state.comments || {});
  const observer = useRef();
  const [page, setPage] = useState(0);
  const [commentValues, setCommentValues] = useState({});
  const [likeStates, setLikeStates] = useState({});
  const perPage = 5;
  const hasMore = groups.length % perPage === 0 && groups.length < 100;

  const getRandomLikes = () => Math.floor(Math.random() * 1000) + 1;

  useEffect(() => {
    if (!hasMore) return;
    dispatch(fetchGroups({ startPage: page, perPage }));
  }, [dispatch, page, hasMore]);

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem("comments")) || {};
    for (const groupId in storedComments) {
      for (const postId in storedComments[groupId]) {
        dispatch(setComments({
          groupId,
          postId,
          comments: storedComments[groupId][postId],
        }));
      }
    }
  }, [dispatch]);

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
      userId: userFromId,
      createdDate: new Date().toISOString(),
    };

    dispatch(addComment({
      groupId,
      postId,
      comment: newComment,
    }));

    const updatedComments = JSON.parse(localStorage.getItem("comments")) || {};
    if (!updatedComments[groupId]) updatedComments[groupId] = {};
    if (!updatedComments[groupId][postId]) updatedComments[groupId][postId] = [];
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
      const likes = prevStates[postId]?.likes || getRandomLikes();
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
        <p>Загрузка...</p>
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
        <p>Групи не знайдені.</p>
      </MainContent>
    );
  }

  return (
    <MainContent title="">
      <div className={styles.groupContainer}>
        <div className={styles.groupHeader}>
          {groups.map((group, index) => (
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
            <div className={styles.groupRender}>
              {selectedGroup.posts && selectedGroup.posts.length > 0 ? (
                selectedGroup.posts.map((post, index) => {
                  const postComments = comments[selectedGroup.id]?.[post.id] || [];
                  const { liked = false, likes = getRandomLikes() } = likeStates[post.id] || {};

                  return (
                    <div key={index} className={styles.post}>
                      <h3>{post.title}</h3>
                      <p>{post.content}</p>
                      <div className={styles.postFeedback}>
                        <div className={styles.likes}>
                          <LikeIcon liked={liked} onClick={() => handleLikeClick(post.id)} /> {likes}
                        </div>
                        <div className={styles.comments}>
                          Коментарі: {postComments.length}
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
                                <p>{comment.content}</p>
                              </div>
                            ))
                          ) : (
                            <p>Коментарів ще немає.</p>
                          )}
                        </div>
                        <textarea
                          name={`comment-${post.id}`}
                          onChange={(e) => handleCommentChange(post.id, e)}
                          value={commentValues[post.id] || ""}
                          placeholder="Напишіть коментар..."
                        />
                        <button type="submit">Відправити коментар</button>
                      </form>
                    </div>
                  );
                })
              ) : (
                <p>Постів не знайдено.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </MainContent>
  );
};

export default GroupPage;






