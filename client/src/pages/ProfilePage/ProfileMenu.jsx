import { NavLink } from "react-router-dom";
import styles from "./ProfileMenu.module.scss";
import MainContent from "../../components/MainContent/MainContent.jsx";

const ProfileMenu = () => {
    return (
        <MainContent title="">
        <nav className={styles.navContainer}>
            <ul className={styles.menu}>
                <li>
                    <NavLink
                        to="/profile/general_information"
                        className={({ isActive }) => isActive ? `${styles.navButton} ${styles.activeButton}` : styles.navButton}
                    >
                        General Information
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/profile/place_of_residence"
                        className={({ isActive }) => isActive ? `${styles.navButton} ${styles.activeButton}` : styles.navButton}
                    >
                        Place of Residence
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/profile/hobbies"
                        className={({ isActive }) => isActive ? `${styles.navButton} ${styles.activeButton}` : styles.navButton}
                    >
                        Hobbies
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/profile/workplace"
                        className={({ isActive }) => isActive ? `${styles.navButton} ${styles.activeButton}` : styles.navButton}
                    >
                        Workplace
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/profile/photo_library"
                        className={({ isActive }) => isActive ? `${styles.navButton} ${styles.activeButton}` : styles.navButton}
                    >
                        Photo Library
                    </NavLink>
                </li>
            </ul>
        </nav>
        </MainContent>
    );
};

export default ProfileMenu;
