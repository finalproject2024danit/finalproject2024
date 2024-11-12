import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchFriends, deleteFriendThunk } from "../../redux/slices/friendsSlice.js";
import styles from "./RightSidebar.module.scss";
import ButtonDeleteFriend from "../../components/ButtonDeleteFriend/index.jsx";

const RightSidebar = () => {
  const dispatch = useDispatch();
  const userFromId = useSelector((state) => state.user.id);
  const { friends, status, error } = useSelector((state) => state.friends);

  useEffect(() => {
    if (userFromId) {
      dispatch(fetchFriends(userFromId));
    }
  }, [dispatch, userFromId]);

  const handleDeleteFriend = (userId) => {
    console.log("Deleting friend:", { userFromId, userId });
    dispatch(deleteFriendThunk({ userFromId, userToId: userId }));
  };

  return (
    <div className={`${styles.rightMenu} ${styles.shinyCta}`}>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p className={styles.error}>Error: {error}</p>}
      {status === "succeeded" && (
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
                onClick={() => handleDeleteFriend(friend.id)}
                className={styles.deleteButton}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RightSidebar;
