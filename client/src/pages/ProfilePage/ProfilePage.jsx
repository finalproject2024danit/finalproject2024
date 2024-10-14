import styles from './ProfilePage.module.scss';
import MainContent from "../../components/MainContent/MainContent.jsx";

const ProfilePage = () => {
  const profile = (
    <div>
      <ul>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, eveniet.</li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, eveniet.</li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, eveniet.</li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, eveniet.</li>
        <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, eveniet.</li>
      </ul>
    </div>
  );

  return (
    <div className={styles.mainContent}>
      <MainContent title="Profile Information">
        {profile}
      </MainContent>
    </div>
  );
};

export default ProfilePage;
