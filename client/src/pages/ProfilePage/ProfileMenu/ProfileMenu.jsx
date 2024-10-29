import { NavLink } from "react-router-dom";
import styles from "./ProfileMenu.module.scss";

const ProfileMenu = () => {
    return (
        <nav className={styles.navContainer}>
            <ul className={styles.menu}>
                <li>
                    <NavLink to="/profile/general_information" className={styles.navButton} activeClassName={styles.activeButton}>
                        General Information
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/profile/place_of_residence" className={styles.navButton} activeClassName={styles.activeButton}>
                        Place of Residence
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/profile/hobbies" className={styles.navButton} activeClassName={styles.activeButton}>
                        Hobbies
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/profile/workplace" className={styles.navButton} activeClassName={styles.activeButton}>
                        Workplace
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/profile/photo_library" className={styles.navButton} activeClassName={styles.activeButton}>
                        Photo Library
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default ProfileMenu;