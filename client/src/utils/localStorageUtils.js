export const getGroupsFromLocalStorage = () => {
    try {
      return JSON.parse(localStorage.getItem("groups")) || [];
    } catch (error) {
      console.error("Error parsing groups from localStorage:", error);
      return [];
    }
  };
  
  export const saveGroupsToLocalStorage = (groups) => {
    try {
      localStorage.setItem("groups", JSON.stringify(groups));
    } catch (error) {
      console.error("Failed to update localStorage:", error);
    }
  };
  
  export const updatePostsInLocalStorage = (postId, updatedPost = null) => {
    const storedGroups = getGroupsFromLocalStorage();
    const updatedGroups = storedGroups.map((group) => {
      if (group.posts?.some((post) => post.id === postId)) {
        return {
          ...group,
          posts: updatedPost
            ? group.posts.map((post) => (post.id === postId ? updatedPost : post))
            : group.posts.filter((post) => post.id !== postId),
        };
      }
      return group;
    });
    saveGroupsToLocalStorage(updatedGroups);
  };