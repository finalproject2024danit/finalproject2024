import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups, fetchGroupById } from "../../redux/slices/groupSlice.js";
import styles from "./GroupPage.module.scss";
import MainContent from "../../components/MainContent/MainContent";


const defaultAvatarGroup =
  "https://res.cloudinary.com/dsr6kwzrr/image/upload/w_200,ar_16:9,c_fill,g_auto,e_sharpen/v1729669892/photo_2024-10-23_10-30-18_nmluce.jpg";

const GroupPage = () => {
  const dispatch = useDispatch();
  const { groups, loading, error, startPage, perPage, selectedGroup } = useSelector((state) => state.group);
  const observer = useRef();

  useEffect(() => {
    // Загрузка начальной страницы групп при первичном рендере
    dispatch(fetchGroups({ startPage, perPage }));
  }, [dispatch, startPage, perPage]);

  // Функция для отслеживания последнего элемента списка
  const lastGroupElementRef = (node) => {
    if (loading) return; // Если идет загрузка, ничего не делаем
    if (observer.current) observer.current.disconnect(); // Отключаем наблюдателя от предыдущего элемента

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(fetchGroups({ startPage, perPage })); // Загружаем следующую страницу, когда элемент пересечен
      }
    });

    if (node) observer.current.observe(node); // Начинаем наблюдение за новым элементом
  };

  // Обработчик для загрузки данных выбранной группы
  const handleGroupClick = (groupId) => {
    dispatch(fetchGroupById(groupId));
  };

  // Рендеринг в зависимости от состояния
  if (loading && startPage === 0) {
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
        <p>Группы не найдены.</p>
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
              ref={groups.length === index + 1 ? lastGroupElementRef : null} // Назначаем последний элемент для отслеживания
              className={styles.groupLink}
              onClick={() => handleGroupClick(group.id)}
            >
              <h2>{group.name}</h2>
              <img 
                src={group.photo || defaultAvatarGroup} 
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
                selectedGroup.posts.map((post, index) => (
                  <div key={index} className={styles.post}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                  </div>
                ))
              ) : (
                <p>Постов не найдено.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </MainContent>
  );
};

export default GroupPage;
