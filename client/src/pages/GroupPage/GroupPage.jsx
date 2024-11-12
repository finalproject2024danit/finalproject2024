import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups, fetchGroupById } from "../../redux/slices/groupSlice.js";
import { useFormik } from "formik";
import styles from "./GroupPage.module.scss";
import MainContent from "../../components/MainContent/MainContent";
import { setComments, addComment } from "../../redux/slices/commentsSlice.js";

const GroupPage = () => {
  const dispatch = useDispatch();
  const { groups, loading, error, selectedGroup } = useSelector(
    (state) => state.group
  );

  // Перевірка на undefined для comments
  const { comments = {} } = useSelector((state) => state.comments || {});

  const observer = useRef();
  const hasMore = groups.length < 100;

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

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
        dispatch(fetchGroups());
      }
    });

    if (node) observer.current.observe(node);
  };

  const handleGroupClick = (groupId) => {
    dispatch(fetchGroupById(groupId));
  };

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    onSubmit: (values, { resetForm }) => {
      const newComment = {
        content: values.comment,
        postId: formik.values.postId,  // Використовуємо ID поточного поста
        groupId: formik.values.groupId, // Використовуємо ID поточної групи
        userId: 1,
        createdDate: new Date().toISOString(),
      };

      // Додаємо коментар до відповідного поста цієї групи
      dispatch(addComment({
        groupId: newComment.groupId,
        postId: newComment.postId,
        comment: newComment,
      }));

      // Збереження коментарів в localStorage
      const updatedComments = JSON.parse(localStorage.getItem("comments")) || {};
      if (!updatedComments[newComment.groupId]) {
        updatedComments[newComment.groupId] = {};
      }
      if (!updatedComments[newComment.groupId][newComment.postId]) {
        updatedComments[newComment.groupId][newComment.postId] = [];
      }
      updatedComments[newComment.groupId][newComment.postId].push(newComment);

      localStorage.setItem("comments", JSON.stringify(updatedComments));

      resetForm();
    },
  });

  const getRandomLikes = () => Math.floor(Math.random() * 1000) + 1;

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
                  // Отримуємо коментарі для поточного поста в обраній групі
                  const postComments = comments[selectedGroup.id]?.[post.id] || [];

                  return (
                    <div key={index} className={styles.post}>
                      <h3>{post.title}</h3>
                      <p>{post.content}</p>
                      <div className={styles.postFeedback}>
                        <div className={styles.likes}>
                          Лайки: {getRandomLikes()}
                        </div>
                        <div className={styles.comments}>
                          Коментарі: {postComments.length}
                        </div>
                      </div>
                      <form
                        onSubmit={(event) => {
                          event.preventDefault();
                          formik.setValues({ 
                            ...formik.values, 
                            groupId: selectedGroup.id, 
                            postId: post.id 
                          });
                          formik.handleSubmit();
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
                          name="comment"
                          onChange={formik.handleChange}
                          value={formik.values.comment}
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




