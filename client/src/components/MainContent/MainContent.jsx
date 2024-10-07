



import React from 'react';
import PropTypes from 'prop-types';
import styles from './MainContent.module.scss';

const MainContent = ({ title, children }) => {
  return (
    <div className={styles.mainFeed}>
      <h1>{title}</h1>
      {children?.length > 0 ? children : <p>Контент отсутствует.</p>}
    </div>
  );
};

MainContent.propTypes = {
  title: PropTypes.string.isRequired, // 'title' — обязательная строка
  children: PropTypes.node, // 'children' может быть любым элементом React
};

export default MainContent;


// import React from 'react';
// import PropTypes from 'prop-types';
// import styles from './MainContent.module.scss'

// const MainContent = ({title, children}) => {
//   return (
//     <div className={styles.mainFeed}>
//       <h1>{title}</h1>
//       {children && children.length > 0 ? (children) : (<p>No content available.</p>)}
//     </div>
//   );
// };

// MainContent.propTypes = {
//   title: PropTypes.string.isRequired, // 'title' is a required string
// };

// export default MainContent;






// import React from 'react';
// import PropTypes from 'prop-types';
// import styles from './MainContent.module.scss'

// const MainContent = ({title, children}) => {
//   return (
//     <div className={styles.mainFeed}>
//       <h1>{title}</h1>
//       {children && children.length > 0 ? (children) : (<p>No content available.</p>)}
//     </div>
//   );
// };

// MainContent.propTypes = {
//   title: PropTypes.string.isRequired, // 'title' is a required string
// };

// export default MainContent;
