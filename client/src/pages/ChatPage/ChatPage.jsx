// import React from "react";
import styles from './ChatPage.module.scss';
import MainContent from "../../components/MainContent/MainContent";
import MemberList from "../../components/MemberList/MemberList"; // Create this component for the right sidebar
import ChatFeed from "../../components/ChatFeed/ChatFeed"; // Create this component for the chat messages

const ChatPage = () => {

  return (
    <div className={styles.layout}>
      {/* Left Sidebar if necessary */}
      {/* <LeftSidebar /> */}
      
      {/* Main Content Area */}
      <div className={styles.mainContent}>
        <MainContent title="Spaceship Crew">
          <div className={styles.chatFeed}>
          <ChatFeed /> {/* This component will render the list of chat messages */}
          </div>
        </MainContent>
      </div>

      {/* Right Sidebar for Members */}
      <div className={styles.memberList}>
        <MemberList /> {/* This component will list the currently online and offline members */}
      </div>
    </div>
  );
}

export default ChatPage;
