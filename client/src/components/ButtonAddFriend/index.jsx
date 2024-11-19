import styles from "./ButtonAddFriend.module.scss";
import React from "react";
import PropTypes from "prop-types";

const ButtonAddFriend = ({ userId, onClick, isFriend }) => {
  return (
    <button
      className={styles.btn}
      onClick={() => !isFriend && onClick(userId)} // Кнопка не буде працювати, якщо вже друг
      disabled={isFriend} // Якщо користувач вже друг, кнопка стає неактивною
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

