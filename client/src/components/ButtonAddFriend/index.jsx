import styles from "./ButtonAddFriend.module.scss";
import PropTypes from "prop-types";

const ButtonAddFriend = ({ userId, onClick, isFriend }) => {
  return (
    <button
      className={styles.btn}
      onClick={() => !isFriend && onClick(userId)}
      disabled={isFriend}
    >
      {isFriend ? "Friend" : "Add Friend"}
    </button>
  );
};

ButtonAddFriend.propTypes = {
  userId: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  isFriend: PropTypes.bool.isRequired,
};

export default ButtonAddFriend;
