import { useRef, useState } from 'react';
import PropTypes from 'prop-types'; // Импортируем PropTypes
import styles from './AccountPage.module.scss'; 

const FriendCard = ({ avatarUrl, name }) => (
  <div className={styles.friendCard}>
    <img src={avatarUrl} alt={name} className={styles.friendAvatar} />
    <h3 className={styles.friendName}>{name}</h3>
    <button className={styles.addFriendButton}>Додати у друзі</button>
  </div>
);

// Определяем типы пропсов для FriendCard
FriendCard.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const AccountPage = () => {
  const bannerInputRef = useRef(null);
  const avatarInputRef = useRef(null);
  const [isFriendsVisible, setIsFriendsVisible] = useState(true); // Состояние для видимости блока друзей
  const [activeNav, setActiveNav] = useState('Дописи'); // Состояние для активного элемента навигации

  const handleBannerClick = (event) => {
    event.preventDefault();
    bannerInputRef.current.click();
  };

  const handleAvatarClick = (event) => {
    event.preventDefault();
    avatarInputRef.current.click();
  };

  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    console.log("Загружено изображение баннера:", file);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    console.log("Загружено изображение аватара:", file);
  };

  const toggleFriendsVisibility = () => {
    setIsFriendsVisible((prev) => !prev); // Переключаем видимость блока друзей
  };

  const handleNavClick = (navItem) => {
    setActiveNav(navItem); // Устанавливаем активный элемент навигации
  };

  const friends = [
    { avatarUrl: "https://via.placeholder.com/50", name: "Друг 1" },
    { avatarUrl: "https://via.placeholder.com/50", name: "Друг 2" },
    { avatarUrl: "https://via.placeholder.com/50", name: "Друг 3" },
  ];

  return (
    <div className={styles.accountPage}>
      <div className={styles.profileHeader}>
        <a href="#" onClick={handleBannerClick}>
          <img 
            src="https://via.placeholder.com/150" 
            alt="Profile banner" 
            className={styles.banner} 
          />
          <button 
            className={styles.bannerButton} 
            onClick={handleBannerClick} 
            aria-label="Change banner"
          >
            Змінити Банер
          </button>
        </a>
        <input 
          type="file" 
          accept="image/*" 
          ref={bannerInputRef} 
          onChange={handleBannerChange} 
          style={{ display: 'none' }} 
        />
        <div className={styles.avatarContainer}>
          <a href="#" onClick={handleAvatarClick}>
            <img 
              src="https://via.placeholder.com/100" 
              alt="User avatar" 
              className={styles.avatar} 
            />
            <button 
              className={styles.avatarButton} 
              onClick={handleAvatarClick} 
              aria-label="Change avatar" 
            >
            </button>
          </a>
          <input 
            type="file" 
            accept="image/*" 
            ref={avatarInputRef} 
            onChange={handleAvatarChange} 
            style={{ display: 'none' }} 
          />
          <div className={styles.userInfo}>
            <h2>Імя</h2>
            <p>Друзів: 10</p>
          </div>
        </div>
      </div>

      {/* Кнопка для скрытия/раскрытия блока друзей */}
      <button 
        className={styles.toggleFriendsButton} 
        onClick={toggleFriendsVisibility}
        aria-label="Toggle friends section"
      >
        {isFriendsVisible ? '↑' : '↓'} {/* Используем текстовые стрелки */}
      </button>

      {/* Новый блок для друзей */}
      {isFriendsVisible && (
        <div className={styles.friendsSection}>
          <h2>Друзі</h2>
          <div className={styles.friendsList}>
            {friends.map((friend, index) => (
              <FriendCard 
                key={index} 
                avatarUrl={friend.avatarUrl} 
                name={friend.name} 
              />
            ))}
          </div>
        </div>
      )}

      <hr className={styles.accountBrake} />
      
      {/* Добавляем навигационные ссылки под полоской */}
      <nav className={styles.navLinks}>
        {['Дописи', 'Інформація', 'Друзі', 'Світлини'].map((item) => (
          <div 
            key={item} 
            className={`${styles.navLink} ${activeNav === item ? styles.active : ''}`} 
            onClick={() => handleNavClick(item)}
          >
            {item}
            {activeNav === item && <div className={styles.activeLine} />}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default AccountPage;
