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
    const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom && hasMore && status !== "loading") {
      dispatch(fetchFriendsWithPagination({ userId: userFromId, page: currentPage + 1, perPage: 3 }));
    }
  };

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
          {friends.map((friend) => (
            <li key={`${friend.id}-${friend.firstName}-${friend.lastName}-${friend.avatar}`} className={styles.friendItem}>
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
              <ButtonDeleteFriend onClick={() => handleOpenModal(friend.id)} className={styles.deleteButton} />
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




// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";
// import {
//   deleteFriendThunk,
//   fetchFriends,
// } from "../../redux/slices/friendsSlice.js";
// import styles from "./RightSidebar.module.scss";
// import ButtonDeleteFriend from "../../components/ButtonDeleteFriend/index.jsx";
// import Modal from "../../components/Modal/Modal";

// const RightSidebar = () => {
//   const dispatch = useDispatch();
//   const userFromId = useSelector((state) => state.user.id);
//   const { friends, status, error } = useSelector((state) => state.friends);

//   const [isModalOpen, setModalOpen] = useState(false);
//   const [selectedFriendId, setSelectedFriendId] = useState(null);

//   useEffect(() => {
//     if (userFromId) {
//       dispatch(fetchFriends(userFromId));
//     }
//   }, [dispatch, userFromId]);

//   const handleOpenModal = (friendId) => {
//     setSelectedFriendId(friendId);
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//     setSelectedFriendId(null);
//   };

//   const handleConfirmDelete = () => {
//     if (selectedFriendId !== null) {
//       dispatch(
//         deleteFriendThunk({ userFromId, userToId: selectedFriendId })
//       ).then(() => {
//         dispatch(fetchFriends(userFromId));
//       });
//       handleCloseModal();
//     }
//   };

//   return (
//     // <div className={`${styles.rightMenu} ${styles.shinyCta}`}>
//     <div className={`${styles.rightMenu}`}>
//       {status === "loading" && <p>Loading...</p>}
//       {status === "failed" && <p className={styles.error}>Error: {error}</p>}
//       {status === "succeeded" && friends.length > 0 && (
//         <ul>
//           {friends.map((friend) => (
//             <li key={friend.id} className={styles.friendItem}>
//               <NavLink to={`/user/${friend.id}`} className={styles.friendLink}>
//                 <img
//                   src={friend.avatar}
//                   alt={`${friend.firstName} ${friend.lastName}`}
//                   title={`${friend.firstName} ${friend.lastName}`}
//                   style={{ width: "30px", height: "30px", borderRadius: "50%" }}
//                 />
//                 <div className={styles.friendName}>
//                   <p>{friend.firstName}</p>
//                   <p>{friend.lastName}</p>
//                 </div>
//               </NavLink>
//               <ButtonDeleteFriend
//                 onClick={() => handleOpenModal(friend.id)}
//                 className={styles.deleteButton}
//               />
//             </li>
//           ))}
//         </ul>
//       )}
//       {status === "succeeded" && friends.length === 0 && (
//         <p>No friends found.</p>
//       )}
//       <Modal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         onConfirm={handleConfirmDelete}
//         message="Are you sure you want to delete this friend?"
//       />
//     </div>
//   );
// };

// export default RightSidebar;
