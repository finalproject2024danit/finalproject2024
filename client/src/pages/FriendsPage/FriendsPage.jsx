import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./FriendsPage.module.scss";
import MainContent from "../../components/MainContent/MainContent.jsx";
import ButtonDeleteFriend from "../../components/ButtonDeleteFriend/index.jsx";
import Modal from "../../components/Modal/ModalFriend/Modal.jsx";
import {
  fetchFriendsPageWithPagination,
  deleteFriendPageThunk,
} from "../../redux/slices/friendsPageSlice.js";
import { useTranslation } from "react-i18next";

const defaultAvatar =
  "https://res.cloudinary.com/dsr6kwzrr/image/upload/v1729669892/photo_2024-10-23_10-30-18_nmluce.jpg";

const FriendsPage = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [flippedCards, setFlippedCards] = useState({});
  const { t } = useTranslation();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedFriendId, setSelectedFriendId] = useState(null);
  const userFromId = useSelector((state) => state.user.id);
  const { friends, status, error, currentPage, hasMore } = useSelector(
    (state) => state.friends
  );
  const [loading, setLoading] = useState(false);

  const friendsPerPage = 10;

  const fetchFriendsPage = useCallback(() => {
    if (!hasMore || loading) return;
    setLoading(true);

    dispatch(
      fetchFriendsPageWithPagination({
        userId: userFromId,
        startPage: currentPage,
        perPage: friendsPerPage,
      })
    ).finally(() => {
      setLoading(false);
    });
  }, [dispatch, userFromId, currentPage, hasMore, loading]);

  useEffect(() => {
    fetchFriendsPage();
  }, [fetchFriendsPage]);

  const handleScroll = () => {
    const scrollPosition =
      window.innerHeight + document.documentElement.scrollTop;
    const threshold =
      document.documentElement.scrollHeight - window.innerHeight - 100;

    if (!loading && hasMore && scrollPosition >= threshold) {
      dispatch(
        fetchFriendsPageWithPagination({
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
  }, []);

  const filteredFriends = friends.filter((friend) =>
    `${friend.firstName} ${friend.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    setTimeout(() => {
      setFlippedCards((prev) => ({
        ...prev,
        [id]: false,
      }));
    }, 5000);
  };

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
      dispatch(
        deleteFriendPageThunk({ userFromId, userToId: selectedFriendId })
      ).then(() => {
        dispatch(
          fetchFriendsPageWithPagination({
            userId: userFromId,
            startPage: currentPage,
            perPage: 10,
          })
        );
      });
      handleCloseModal();
    }
  };

  // const handleDeleteFriend = (friendId) => {
  //   setModalMessage("Are you sure you want to delete this friend?");
  //   setOnConfirmAction(() => () => {
  //     dispatch(deleteFriendThunk({ userFromId, userToId: friendId }))
  //       .then(() => {
  //         dispatch(
  //           fetchFriendsWithPagination({
  //             userId: userFromId,
  //             startPage: 1,
  //             perPage: friendsPerPage,
  //           })
  //         );
  //       })
  //       .finally(() => {
  //         setIsModalOpen(false);
  //       });
  //   });
  //   setIsModalOpen(true);
  // };

  return (
    <MainContent title="">
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search friends"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.friendBox}>
        {filteredFriends.map((friend) => (
          <div
            key={friend.id}
            className={`${styles.friendCard} ${
              flippedCards[friend.id] ? styles.flipped : ""
            }`}
            onClick={() => handleCardClick(friend.id)}
          >
            <div className={styles.front}>
              <div className={styles.inner}>
                <img
                  className={styles.friendPhoto}
                  src={friend.avatar || defaultAvatar}
                  alt={`${friend.firstName} ${friend.lastName}`}
                  onError={(e) => (e.target.src = defaultAvatar)}
                />
                <h2>
                  {friend.firstName} {friend.lastName}
                </h2>
              </div>
            </div>
            <div className={styles.back}>
              <div className={styles.inner}>
                <NavLink to={`/user/${friend.id}`} className={styles.link}>
                  <h3 className={styles.infoFriend}>{t("users.infoUser")}</h3>
                </NavLink>
                <ButtonDeleteFriend
                  onClick={() => handleOpenModal(friend.id)}
                />
                <h2 className={styles.clickToFlip}>{t("users.clickToFlip")}</h2>
              </div>
            </div>
          </div>
        ))}
        <Modal
          isOpen={isModalOpen}
          message="Are you sure you want to delete this friend?"
          onConfirm={handleConfirmDelete}
          onClose={handleCloseModal}
        />
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
      </div>
    </MainContent>
  );
};

export default FriendsPage;
