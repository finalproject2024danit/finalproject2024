import { useState, useEffect } from 'react';
import styles from './FriendsPage.module.scss';
import Card from '../../components/Card';
import Modal from '../../components/Modal';
// import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import MainContent from '../../components/MainContent/MainContent';

const usersUrl = "https://ajax.test-danit.com/api/json/users";
const postsUrl = "https://ajax.test-danit.com/api/json/posts";

const FriendsPage = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await fetch(usersUrl);
        const postsResponse = await fetch(postsUrl);
        const usersData = await usersResponse.json();
        const postsData = await postsResponse.json();

        const postsWithImages = postsData.map(post => ({
          ...post,
          imageUrl: `https://picsum.photos/300/200?random=${post.id}`
        }));

        setUsers(usersData);
        setPosts(postsWithImages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const deletePost = async (postId) => {
    try {
      const response = await fetch(`https://ajax.test-danit.com/api/json/posts/${postId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setPosts(posts.filter(post => post.id !== postId));
      } else {
        alert("Failed to delete the post.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const showUserInfo = (user) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const content = posts.map((post) => {
    const user = users.find(u => u.id === post.userId);
    return user ? (
      <Card
        key={post.id}
        post={post}
        user={user}
        onDelete={deletePost}
        onShowUserInfo={showUserInfo}
      />
    ) : null;
  });

  return (

    // Тут використовується компонент MainContent
    <div className={styles.layout}>
    {/* <LeftSidebar /> */}
    <div className={styles.mainContent}>
    <MainContent title="Friends" >
      {content}
    </MainContent>
    {selectedUser && <Modal user={selectedUser} onClose={closeModal} />}
    </div>
  </div>

    // <div className={styles.friends__box}>
    //   <LeftSidebar/>
    //   <h1>Friends</h1>
    //   <div id="cards-container">
    //     {posts.map((post) => {
    //       const user = users.find(u => u.id === post.userId);
    //       return user ? (
    //         <Card
    //           key={post.id}
    //           post={post}
    //           user={user}
    //           onDelete={deletePost}
    //           onShowUserInfo={showUserInfo}
    //         />
    //       ) : null;
    //     })}
    //   </div>
    //   {selectedUser && <Modal user={selectedUser} onClose={closeModal} />}
    // </div>
  );
};

export default FriendsPage;










// import React from "react";
// import styles from './FriendsPage.module.scss';

// const FriendsPage = () => {
//     return(
// <div className={styles.friends__box}>
//     <h1>Friends</h1>  
//       </div>
//     )

// }

// export default FriendsPage;