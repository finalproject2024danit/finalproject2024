import styles from "./ButtonDeleteFriend.module.scss";
import PropTypes from "prop-types";

const ButtonDeleteFriend = ({ userId, onClick, children }) => {
  return (
    <button className={styles.btn} onClick={() => onClick(userId)}>
      х{children}
    </button>
  );
};

ButtonDeleteFriend.propTypes = {
  userId: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default ButtonDeleteFriend;
