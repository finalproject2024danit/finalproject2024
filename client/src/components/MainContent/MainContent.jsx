import PropTypes from 'prop-types';
import styles from './MainContent.module.scss'

const MainContent = ({title, children}) => {
  return (
    <div className={styles.mainFeed}>
      <h1>{title}</h1>
      {children && children ? (children) : (<p>No content available.</p>)}
    </div>
  );
};

MainContent.propTypes = {
  title: PropTypes.string.isRequired, // 'title' is a required string
  children: PropTypes.node, // Додано валідацію для children
};

export default MainContent;
