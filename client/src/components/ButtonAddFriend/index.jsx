import styles from './ButtonAddFriend.module.scss';


const ButtonAddFriend = ({ id, onClick, children }) => {

    console.log(styles)

    return (
        <button
            className={styles.btn}
            id={id}
            onClick={onClick}
        >
            Add Friend
            {children}
        </button>
    )
};

export default ButtonAddFriend;