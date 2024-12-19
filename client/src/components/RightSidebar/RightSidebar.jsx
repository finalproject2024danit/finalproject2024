import { useEffect, useState, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  deleteFriendThunk,
  fetchFriendsWithPagination,
} from "../../redux/slices/friendsSlice.js";
import styles from "./RightSidebar.module.scss";
// import ButtonDeleteFriend from "../../components/ButtonDeleteFriend/index.jsx";
import Modal from "../../components/Modal/ModalFriend/Modal.jsx";

const RightSidebar = () => {
  const dispatch = useDispatch();
  const userFromId = useSelector((state) => state.user.id);
  const { friends, status, error, hasMore, currentPage } = useSelector(
    (state) => state.friends
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState(null); 
  const scrollContainerRef = useRef(null);

   useEffect(() => {
    if (userFromId) {
      dispatch(
        fetchFriendsWithPagination({
          userId: userFromId,
          startPage: 1,
          perPage: 3,
        })
      );
    }
  }, [dispatch, userFromId]);

  // const handleOpenModal = (friendId) => {
  //   setSelectedFriendId(friendId);
  //   setModalOpen(true);
  // };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedFriendId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedFriendId !== null) {
      dispatch(
        deleteFriendThunk({ userFromId, userToId: selectedFriendId })
      ).then(() => {
        dispatch(
          fetchFriendsWithPagination({
            userId: userFromId,
            startPage: currentPage,
            perPage: 3,
          })
        );
      });
      handleCloseModal();
    }
  };

  const handleScroll = (e) => {
    const isBottomReached =
      e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight - 1;
  
    if (isBottomReached && hasMore && status !== "loading") {
      const scrollTop = scrollContainerRef.current.scrollTop;
  
      dispatch(
        fetchFriendsWithPagination({
          userId: userFromId,
          startPage: currentPage + 1,
          perPage: 3,
        })
      ).finally(() => {
        scrollContainerRef.current.scrollTop = scrollTop;
      });
    }
  };

  {status === "failed" && <p className={styles.error}>Error: {error}</p>}
 
  return (
    <div
      className={styles.rightMenu}
      onScroll={handleScroll}
      ref={scrollContainerRef}
    >
       <h2 className={styles.friendsTitle}>Friends</h2>      

      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p className={styles.error}>Error: {error}</p>}
      {status === "succeeded" && friends.length > 0 && (
        <ul>
          {friends.map((friend) => (
            <li key={friend.id} className={styles.friendItem}>
              <NavLink to={`/user/${friend.id}`} className={styles.friendLink}>
                <img
                  src={friend.avatar}
                  alt={`${friend.firstName} ${friend.lastName}`}
                  title={`${friend.firstName} ${friend.lastName}`}
                  className={styles.friendAvatar} 
                />
                <div className={styles.friendName}>
                  <p>{friend.firstName}</p>
                  <p>{friend.lastName}</p>
                </div>
              </NavLink>
              {/* <ButtonDeleteFriend
                onClick={() => handleOpenModal(friend.id)}
                className={styles.deleteButton}
              /> */}
            </li>
          ))}
        </ul>
      )}

      {status === "succeeded" && friends.length === 0 && (
        <p>No friends found.</p>
      )}

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
