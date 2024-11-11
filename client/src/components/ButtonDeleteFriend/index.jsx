import styles from "./ButtonDeleteFriend.module.scss";
import React from "react";
import PropTypes from "prop-types";

const ButtonDeleteFriend = ({ userId, onClick, children }) => {
    return (
      <button className={styles.btn} onClick={() => onClick(userId)}>
        х
        {children}
      </button>
    );
  };

  ButtonDeleteFriend.propTypes = {
    userId: PropTypes.string, // Ідентифікатор (необов'язково)
    onClick: PropTypes.func.isRequired, // Функція-обробник (обов'язкова)
    children: PropTypes.node, // Дочірні елементи
  };

export default ButtonDeleteFriend;