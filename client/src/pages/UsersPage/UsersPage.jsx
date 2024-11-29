import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./UsersPage.module.scss";
import MainContent from "../../components/MainContent/MainContent";
import axiosInstance from "../../api/axiosInstance.js";
import ButtonAddFriend from "../../components/ButtonAddFriend/index.jsx";
import {
  addFriendThunk,
  fetchFriends,
} from "../../redux/slices/friendsSlice.js";
import { useTranslation } from "react-i18next";
import Modal from "../../components/Modal/Modal.jsx";

const defaultAvatar =
  "https://res.cloudinary.com/dsr6kwzrr/image/upload/v1729669892/photo_2024-10-23_10-30-18_nmluce.jpg";

const UsersPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const usersPerPage = 10;
  const sortBy = "firstName";
  const sortDirection = "asc";
  const userFromId = useSelector((state) => state.user.id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [onConfirmAction, setOnConfirmAction] = useState(() => () => {});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { friends } = useSelector((state) => state.friends);

  const fetchUsers = useCallback(async () => {
    if (!hasMore) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get("/users/filter", {
        params: {
          startPage: currentPage,
          perPage: usersPerPage,
          sortBy,
          sortDirection,
        },
      });

      const usersData = response.data || [];
      if (usersData.length > 0) {
        setUsers((prevUsers) => [...prevUsers, ...usersData]);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setHasMore(false);
      } else {
        setError(t("users.loadError", { message: err.message }));
      }
    } finally {
      setLoading(false);
    }
  }, [currentPage, hasMore, t]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`
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

  const handleAddFriend = (userId) => {
    if (friends.some((friend) => friend.id === userId)) return;

    setSelectedUserId(userId);
    setModalMessage("Are you sure you want to add this friend?");
    setOnConfirmAction(() => () => {
      dispatch(addFriendThunk({ userFromId, userToId: userId }))
        .then(() => {
          dispatch(fetchFriends(userFromId));
        })
        .finally(() => {
          setIsModalOpen(false);
        });
    });
    setIsModalOpen(true);
  };

  return (
    <MainContent title="">
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder={t("users.searchPlaceholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.userBox}>
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className={`${styles.userCard} ${
              flippedCards[user.id] ? styles.flipped : ""
            }`}
            onClick={() => handleCardClick(user.id)}
          >
            <div className={styles.front}>
              <div className={styles.inner}>
                <img
                  className={styles.userPhoto}
                  src={user.avatar || defaultAvatar}
                  alt={`${user.firstName} ${user.lastName}`}
                  onError={(e) => (e.target.src = defaultAvatar)}
                />
                <h2>
                  {user.firstName} {user.lastName}
                </h2>
              </div>
            </div>
            <div className={styles.back}>
              <div className={styles.inner}>
                <NavLink to={`/user/${user.id}`} className={styles.link}>
                  <h3 className={styles.infoUser}>{t("users.infoUser")}</h3>
                </NavLink>
                <ButtonAddFriend
                  userId={user.id}
                  onClick={handleAddFriend}
                  isFriend={friends.some((friend) => friend.id === user.id)}
                  disabled={selectedUserId === null}
                />
                <h2 className={styles.clickToFlip}>{t("users.clickToFlip")}</h2>
              </div>
            </div>
          </div>
        ))}
        <Modal
          isOpen={isModalOpen}
          message={modalMessage}
          onConfirm={onConfirmAction}
          onClose={() => setIsModalOpen(false)}
        />
        {loading && <p>{t("users.loading")}</p>}
        {error && <p>{error}</p>}
      </div>
    </MainContent>
  );
};

export default UsersPage;
