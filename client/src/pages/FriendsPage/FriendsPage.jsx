import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./FriendsPage.module.scss";
import MainContent from "../../components/MainContent/MainContent.jsx";
import ButtonDeleteFriend from "../../components/ButtonDeleteFriend/index.jsx";
import Modal from "../../components/Modal/ModalFriend/Modal.jsx";
import {
  fetchFriendsWithPagination,
  deleteFriendThunk,
} from "../../redux/slices/friendsSlice.js";

const defaultAvatar =
  "https://res.cloudinary.com/dsr6kwzrr/image/upload/v1729669892/photo_2024-10-23_10-30-18_nmluce.jpg";

const FriendsPage = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [onConfirmAction, setOnConfirmAction] = useState(() => () => {});
  const userFromId = useSelector((state) => state.user.id);
  const { friends, status, error, currentPage, hasMore } = useSelector(
    (state) => state.friends
  );
  const [loading, setLoading] = useState(false);

  const friendsPerPage = 10;

  const fetchFriends = useCallback(() => {
    if (!hasMore || loading) return;
    setLoading(true);

    dispatch(
      fetchFriendsWithPagination({
        userId: userFromId,
        startPage: currentPage,
        perPage: friendsPerPage,
      })
    ).finally(() => {
      setLoading(false);
    });
  }, [dispatch, userFromId, currentPage, hasMore, loading]);

  useEffect(() => {
    fetchFriends();
  }, [fetchFriends]);

  const handleScroll = () => {
    const scrollPosition =
      window.innerHeight + document.documentElement.scrollTop;
    const threshold =
      document.documentElement.scrollHeight - window.innerHeight - 100;

    if (!loading && hasMore && scrollPosition >= threshold) {
      dispatch(
        fetchFriendsWithPagination({
          userId: userFromId,
          startPage: currentPage + 1,
          perPage: friendsPerPage,
        })
      );
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const filteredFriends = friends.filter((friend) =>
    `${friend.firstName} ${friend.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleDeleteFriend = (friendId) => {
    setModalMessage("Are you sure you want to delete this friend?");
    setOnConfirmAction(() => () => {
      dispatch(deleteFriendThunk({ userFromId, userToId: friendId }))
        .then(() => {
          dispatch(
            fetchFriendsWithPagination({
              userId: userFromId,
              startPage: 1,
              perPage: friendsPerPage,
            })
          );
        })
        .finally(() => {
          setIsModalOpen(false);
        });
    });
    setIsModalOpen(true);
  };

  return (
    <MainContent title="Friends">
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search friends"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.userBox}>
        {filteredFriends.map((friend) => (
          <div key={friend.id} className={styles.userCard}>
            <NavLink to={`/user/${friend.id}`} className={styles.link}>
              <div className={styles.inner}>
                <img
                  className={styles.userPhoto}
                  src={friend.avatar || defaultAvatar}
                  alt={`${friend.firstName} ${friend.lastName}`}
                  onError={(e) => (e.target.src = defaultAvatar)}
                />
                <h2>
                  {friend.firstName} {friend.lastName}
                </h2>
              </div>
            </NavLink>
            <ButtonDeleteFriend
              onClick={() => handleDeleteFriend(friend.id)}
              className={styles.deleteButton}
            />
          </div>
        ))}
        <Modal
          isOpen={isModalOpen}
          message={modalMessage}
          onConfirm={onConfirmAction}
          onClose={() => setIsModalOpen(false)}
        />
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div>
    </MainContent>
  );
};

export default FriendsPage;
