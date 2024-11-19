import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchFriends, deleteFriendThunk } from "../../redux/slices/friendsSlice.js";
import styles from "./RightSidebar.module.scss";
import ButtonDeleteFriend from "../../components/ButtonDeleteFriend/index.jsx";
import Modal from "../../components/Modal/Modal";

const RightSidebar = () => {
  const dispatch = useDispatch();
  const userFromId = useSelector((state) => state.user.id);
  const { friends, status, error } = useSelector((state) => state.friends);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState(null);

  // Fetch friends when component mounts or `userFromId` changes
  useEffect(() => {
    if (userFromId) {
      dispatch(fetchFriends(userFromId));
    }
  }, [dispatch, userFromId]);

  // Open modal and set selected friend ID
  const handleOpenModal = (friendId) => {
    setSelectedFriendId(friendId);
    setModalOpen(true);
  };

  // Close modal and reset selected friend ID
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedFriendId(null);
  };

  // Confirm friend deletion
  const handleConfirmDelete = () => {
    if (selectedFriendId !== null) {
      dispatch(deleteFriendThunk({ userFromId, userToId: selectedFriendId }));
      handleCloseModal();
    }
  };

  return (
    <div className={`${styles.rightMenu} ${styles.shinyCta}`}>
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
                  style={{ width: "30px", height: "30px", borderRadius: "50%" }}
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
