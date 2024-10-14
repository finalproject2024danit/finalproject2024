// import React from "react";
import Card from "../../components/Card/index.jsx";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar.jsx";
import MainContent from "../../components/MainContent/MainContent.jsx";
import RightSidebar from "../../components/RightSidebar/RightSidebar.jsx";
import styles from "./HomePage.module.scss";



const HomePage = () => {
// const user = {
//   name: 'Peter Pepper',
//   email: 'peterpepperitto@ukr.net'
// }

//   const posts = [
//     { id: 1, title: 'Post 1', body: 'This is the first post content.' },
//     { id: 2, title: 'Post 2', body: 'This is the second post content.' },
//   ];

//   const deletePost = (postId) => {
//     console.log(`Post ${postId} deleted`);
//   };

//   const content = posts.map((post) => (
//     <Card
//       key={post.id}
//       post={post}
//       user={user}
//       onDelete={() => deletePost(post.id)}
//     />
//   ));

  return (
    <>
    {/* <div><MainContent title="News Feed"> */}
    <div><MainContent>
    </MainContent></div>
    {/* <div className={styles.layout}>
      <LeftSidebar />
      <div className={styles.mainContent}>
        <MainContent title="News Feed">{content}
        </MainContent>
      </div>
      <RightSidebar />
    </div> */}
    </>
  );
};

export default HomePage;
