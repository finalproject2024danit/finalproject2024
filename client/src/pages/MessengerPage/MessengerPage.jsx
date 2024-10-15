// import React from 'react';
import MainContent from '../../components/MainContent/MainContent';
import styles from './MessengerPage.module.scss';

const MessengerPage = () => {
  const onlineMessengers = ['Adam Green', 'David Singh', 'Harper Singh', 'Lily Patel'];
  const offlineMessengers = ['Lucas Ortiz', 'Marcus Chen', 'Mia Park', 'Olivia Sharma', 'Sophia Zhang'];

  // Компонент Messenger, який повертає JSX
  const Messenger = () => {
    return (
      <div className={styles.messengerList}>
        <div className={styles.onlineSection}>
          <h3>Currently Online</h3>
          <ul>
            {onlineMessengers.map((messenger, index) => (
              <li key={index} className={styles.online}>
                {messenger}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.offlineSection}>
          <h3>Offline</h3>
          <ul>
            {offlineMessengers.map((messenger, index) => (
              <li key={index} className={styles.offline}>
                {messenger}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  // Виклик функції Messenger як children в MainContent
  return (
    <div className={styles.mainContent}>
      <MainContent title="Messenger Status">
        {Messenger()} {/* Виклик функції Messenger */}
      </MainContent>    
    </div>
  );
};

export default MessengerPage;
