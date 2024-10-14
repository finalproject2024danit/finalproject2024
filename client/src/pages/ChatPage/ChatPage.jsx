// import React from "react";
import styles from './ChatPage.module.scss';
// import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import MainContent from "../../components/MainContent/MainContent";


const ChatPage = () => {
    // const chatContent = (
    //     <div>
    //       <h2>Featured Games</h2>
    //       <ul>
    //         <li>Game 1: Puzzle Adventure</li>
    //         <li>Game 2: Space Shooter</li>
    //         <li>Game 3: Racing Challenge</li>
    //         <li>Game 4: Fantasy World</li>
    //       </ul>
    //     </div>
    //   );

    return(
        <div className={styles.layout}>
        {/* <LeftSidebar /> */}
        <div className={styles.mainContent}>
        <MainContent title=" Chat">
          {/* {chatContent} */}
        </MainContent>
        </div>
      </div>
    //     <div className={styles.games__box}>
    //         <LeftSidebar/>
    // <h1>Games</h1>    
    // </div>
    )
}

export default ChatPage;