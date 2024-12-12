import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  deleteFriendThunk,
  fetchFriendsWithPagination,
} from "../../redux/slices/friendsSlice.js";
import styles from "./RightSidebar.module.scss";
import ButtonDeleteFriend from "../../components/ButtonDeleteFriend/index.jsx";
import Modal from "../../components/Modal/ModalFriend/Modal.jsx";

const RightSidebar = () => {
  const dispatch = useDispatch();
  const userFromId = useSelector((state) => state.user.id);
  const { friends, status, error, hasMore, currentPage } = useSelector((state) => state.friends);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Завантажуємо 3 друзів при першому рендері
  useEffect(() => {
    if (userFromId) {
      dispatch(fetchFriendsWithPagination({ userId: userFromId, page: 1, perPage: 3 }));
    }
  }, [dispatch, userFromId]);

  // Обробка відкриття модалки
  const handleOpenModal = (friendId) => {
    setSelectedFriendId(friendId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedFriendId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedFriendId !== null) {
      dispatch(deleteFriendThunk({ userFromId, userToId: selectedFriendId }))
        .then(() => {
          dispatch(fetchFriendsWithPagination({ userId: userFromId, page: currentPage, perPage: 3 }));
        });
      handleCloseModal();
    }
  };

  // Функція для обробки скролу
  const handleScroll = (e) => {
    const bottom =
      e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight - 1;

    // Якщо є більше елементів і ми дійшли до кінця списку, завантажуємо нові елементи
    if (bottom && hasMore && status !== "loading") {
      dispatch(fetchFriendsWithPagination({ userId: userFromId, page: currentPage + 1, perPage: 3 }));
    }

    // Якщо немає більше елементів (hasMore = false), зупиняємо скрол
    if (!hasMore) {
      console.log("No more friends to load.");
    }
  };

  // Використовуємо useEffect для обробки стану hasMore
  useEffect(() => {
    if (!hasMore) {
      // Якщо немає більше елементів для завантаження, зупиняємо подальше завантаження
      console.log("All friends have been loaded, no more pages.");
    }
  }, [hasMore]);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className={`${styles.rightMenu} ${isExpanded ? styles.expanded : ""}`}
      onScroll={handleScroll}
    >
      <button
        className={styles.toggleButton}
        onClick={toggleExpand}
        aria-label="Toggle Sidebar"
      >
        <span>Friends</span>
        {isExpanded ? "⬆" : "⬇"}
      </button>

      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p className={styles.error}>Error: {error}</p>}
      {status === "succeeded" && friends.length > 0 && (
        <ul>
          {friends.map((friend, index) => (
  <li key={`${friend.id}-${index}`} className={styles.friendItem}>
    <NavLink to={`/user/${friend.id}`} className={styles.friendLink}>
      <img
        src={friend.avatar}
        alt={`${friend.firstName} ${friend.lastName}`}
        title={`${friend.firstName} ${friend.lastName}`}
        style={{ width: "70px", height: "70px", borderRadius: "50%" }}
      />
      <div className={styles.friendName}>
        <p>{friend.firstName}</p>
        <p>{friend.lastName}</p>
      </div>
    </NavLink>
    <ButtonDeleteFriend
      onClick={() => handleOpenModal(friend.id)}
      className={styles.deleteButton}
    />
  </li>
))}

        </ul>
      )}

      {status === "succeeded" && friends.length === 0 && <p>No friends found.</p>}

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this friend?"
      />
    </div>
  );
};

export default RightSidebar;
