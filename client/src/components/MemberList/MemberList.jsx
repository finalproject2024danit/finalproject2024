// // MemberList.js
// import React from 'react';
// import styles from './MemberList.module.scss';

// const MemberList = () => {
//   const onlineMembers = ['Adam Green', 'David Singh', 'Harper Singh', 'Lily Patel'];
//   const offlineMembers = ['Lucas Ortiz', 'Marcus Chen', 'Mia Park', 'Olivia Sharma', 'Sophia Zhang'];

//   return (
//     <div className={styles.memberList}>
//       <div className={styles.onlineSection}>
//         <h3>Currently Online</h3>
//         <ul>
//           {onlineMembers.map((member, index) => (
//             <li key={index} className={styles.online}>
//               {member}
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className={styles.offlineSection}>
//         <h3>Offline</h3>
//         <ul>
//           {offlineMembers.map((member, index) => (
//             <li key={index} className={styles.offline}>
//               {member}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default MemberList;
