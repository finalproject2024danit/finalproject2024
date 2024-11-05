import React, { useEffect, useState } from "react";
import styles from "./GroupPage.module.scss";
import MainContent from "../../components/MainContent/MainContent";
import axiosInstance from "../../api/axiosInstance.js";

const defaultAvatarGroup =
  "https://res.cloudinary.com/dsr6kwzrr/image/upload/w_200,ar_16:9,c_fill,g_auto,e_sharpen/v1729669892/photo_2024-10-23_10-30-18_nmluce.jpg";

const GroupPage = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);


  // const usersPerPage = 10;
  // const sortBy = "firstName";
  // const sortDirection = "asc";
  // const currentPage = 0;
  
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axiosInstance.get(`/groups/filter`);
        setGroups(response.data);
      } catch (err) {
        console.error("Помилка під час отримання даних групи:", err.message);
        setError(`Помилка під час отримання даних групи: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const fetchGroupDetails = async (groupId) => {
    try {
      const response = await axiosInstance.get(`/groups/${groupId}`);
      setSelectedGroup(response.data);
    } catch (err) {
      console.error("Помилка під час отримання даних групи:", err.message);
      setError(`Помилка під час отримання даних групи: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <MainContent title="">
        <p>Завантаження...</p>
      </MainContent>
    );
  }

  if (error) {
    return (
      <MainContent title="">
        <p>{error}</p>
      </MainContent>
    );
  }

  return (
    <MainContent title="">
      <div className={styles.groupContainer}>
        <div className={styles.groupHeader}>
          {groups.map((group) => (
            <div
              key={group.id}
              onClick={() => fetchGroupDetails(group.id)}
              className={styles.groupLink}
            >
              <h2>{group.name}</h2>
              <img
                src={group.avatar || defaultAvatarGroup}
                alt={`${group.name} Avatar`}
                className={styles.avatar}
              />
            </div>
          ))}
        </div>
        <div className={styles.groupRender}>
          {selectedGroup && (
            <>
              <h3>{selectedGroup.name}</h3>
              <div className={styles.groupPost}>
                {selectedGroup.posts.map(post => (
                  <div key={post.id} className={styles.post}>
                    <p>{post.content}</p>
                    <p>Created: {new Date(post.createdDate).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </MainContent>
  );
};

export default GroupPage;




// ______________________виводить всю інфу по групі___________________________

// import React, { useEffect, useState } from "react";
// import styles from "./GroupPage.module.scss";
// import MainContent from "../../components/MainContent/MainContent";
// import axiosInstance from "../../api/axiosInstance.js";

// const GroupPage = ({ groupId }) => {
//   const [group, setGroup] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchGroup = async () => {
//       try {
//         const response = await axiosInstance.get(`/groups/1`);
//         console.log(response);
//         setGroup(response.data);
//       } catch (err) {
//         console.error("Error fetching group data:", err.message);
//         setError(`Error fetching group data: ${err.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchGroup();
//   }, [groupId]);

//   if (loading) {
//     return <MainContent title=""><p>Loading...</p></MainContent>;
//   }

//   if (error) {
//     return <MainContent title=""><p>{error}</p></MainContent>;
//   }

//   if (!group) {
//     return <MainContent title=""><p>Group not found.</p></MainContent>;
//   }

//   return (
//     <MainContent title={group.name}>
//       <div className={styles.groupContainer}>
//         <h1>{group.name}</h1>
//         <p>{group.isOpen ? "This group is open." : "This group is closed."}</p>
//         <h2>Posts</h2>
//         {group.posts.length > 0 ? (
//           group.posts.map(post => (
//             <div key={post.id} className={styles.post}>
//               <h3>Post by User {post.userId}</h3>
//               <p>{post.content}</p>
//               <p>Likes: {post.likes.length}</p>
//               <p>Comments: {post.comments.length}</p>
//               <p>Created on: {new Date(post.createdDate).toLocaleString()}</p>
//             </div>
//           ))
//         ) : (
//           <p>No posts available.</p>
//         )}
//       </div>
//     </MainContent>
//   );
// };

// export default GroupPage;
