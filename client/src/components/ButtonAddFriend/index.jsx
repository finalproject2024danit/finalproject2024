import styles from "./ButtonAddFriend.module.scss";

const ButtonAddFriend = ({ id, onClick, children }) => {
  return (
    <button className={styles.btn} id={id} onClick={onClick}>
      Add Friend
      {children}
    </button>
  );
};

export default ButtonAddFriend;
