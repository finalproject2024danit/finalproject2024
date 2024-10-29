import styles from "./ButtonAddFriend.module.scss";
import React from "react";
import PropTypes from "prop-types";

const ButtonAddFriend = ({ id, onClick, children }) => {
  return (
    <button className={styles.btn} id={id} onClick={onClick}>
      Add Friend
      {children}
    </button>
  );
};

ButtonAddFriend.propTypes = {
  id: PropTypes.string, // Идентификатор (необязательно)
  onClick: PropTypes.func.isRequired, // Функция-обработчик (обязательная)
  children: PropTypes.node, // Дочерние элементы
};

export default ButtonAddFriend;
