import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllGroupsFiltered,
  getGroupById,
  createPost,
  updatePost,
  deletePost,
} from "../../api/groups/requests.js";

const initialState = {
  groups: [],
  selectedGroup: null,
  loading: false,
  error: null,
};

export const fetchGroups = createAsyncThunk(
  "groups/fetchGroups",
  async ({ startPage = 0, perPage = 5 }) => {
    const data = await getAllGroupsFiltered(startPage, perPage);
    return data;
  }
);

export const fetchGroupById = createAsyncThunk(
  "groups/fetchGroupById",
  async (id) => {
    const group = await getGroupById(id);
    return group;
  }
);

export const addPostToGroup = createAsyncThunk(
  "groups/addPost",
  async ({ groupId, postData }) => {
    const newPost = await createPost(postData);
    return { groupId, post: newPost };
  }
);

export const editPost = createAsyncThunk(
  "groups/editPost",
  async ({ postId, postData }) => {
    const updatedPost = await updatePost(postId, postData);
    return updatedPost;
  }
);

export const removePost = createAsyncThunk(
  "groups/removePost",
  async (postId) => {
    const response = await deletePost(postId);
    return postId;
  }
);

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.groups = [...state.groups, ...action.payload];
        state.loading = false;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchGroupById.fulfilled, (state, action) => {
        state.selectedGroup = action.payload;
      })
      .addCase(fetchGroupById.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addPostToGroup.fulfilled, (state, action) => {
        const { groupId, post } = action.payload;
        console.log('Adding post to group:', groupId, post);  // Додаємо консольний лог
      
        // Оновлюємо групу в Redux
        if (state.selectedGroup?.id === groupId) {
          state.selectedGroup.posts = [...(state.selectedGroup.posts || []), post];
        }
        const group = state.groups.find((g) => g.id === groupId);
        if (group) {
          group.posts = [...(group.posts || []), post];
        }
      
        // Оновлюємо localStorage
        const storedGroups = JSON.parse(localStorage.getItem("groups")) || [];
        const groupIndex = storedGroups.findIndex((g) => g.id === groupId);
        if (groupIndex > -1) {
          storedGroups[groupIndex].posts.push(post);
        } else {
          storedGroups.push({
            id: groupId,
            posts: [post],
          });
        }
        localStorage.setItem("groups", JSON.stringify(storedGroups));
      
        console.log('Updated localStorage:', storedGroups);  // Додаємо консольний лог
      })
      

      .addCase(editPost.fulfilled, (state, action) => {
        const updatedPost = action.payload;
        const group = state.groups.find((g) =>
          g.posts?.some((post) => post.id === updatedPost.id)
        );
        if (group) {
          group.posts = group.posts.map((post) =>
            post.id === updatedPost.id ? updatedPost : post
          );
        }
      })
      .addCase(removePost.fulfilled, (state, action) => {
        const postId = action.payload;
        state.groups.forEach((group) => {
          group.posts = group.posts?.filter((post) => post.id !== postId);
        });
      });
  },
});

export default groupSlice.reducer;
