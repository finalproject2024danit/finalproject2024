import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFriends } from '../../redux/slices/friendsSlice.js';
import styles from './RightSidebar.module.scss';

const RightSidebar = () => {
  const dispatch = useDispatch();
  const { friends, status, error } = useSelector((state) => state.friends);

  useEffect(() => {
    const currentUserId = 1; // Заміни на актуальний ID користувача
    dispatch(fetchFriends(currentUserId)); // Викликаємо асинхронне діяння для отримання друзів
  }, [dispatch]);

  return (
    <div className={`${styles.rightMenu} ${styles.shinyCta}`}>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p className={styles.error}>Error: {error}</p>}
      {status === 'succeeded' && (
        <ul>
          {friends.map((friend) => (
            <li key={friend.id}>
              <img 
                src={friend.avatar} 
                alt={`${friend.firstName} ${friend.lastName}`} 
                style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
              {friend.firstName} {friend.lastName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RightSidebar;

