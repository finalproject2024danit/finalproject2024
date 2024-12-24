import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllGroupsFiltered,
  getGroupById,
  createPost,
  updatePost,
  deletePost,
  getAllPostsFiltered,
} from "../../api/groups/requests.js";
import {
  getGroupsFromLocalStorage,
  saveGroupsToLocalStorage,
  updatePostsInLocalStorage,
} from "../../utils/localStorageUtils.js";

const initialState = {
  groups: [],
  selectedGroup: null,
  loading: false,
  error: null,
};

export const fetchGroups = createAsyncThunk(
  "groups/fetchGroups",
  async ({ startPage = 0, perPage = 5 }) => {
    return await getAllGroupsFiltered(startPage, perPage);
  }
);

export const fetchGroupById = createAsyncThunk(
  "groups/fetchGroupById",
  async (id) => {
    return await getGroupById(id);
  }
);

export const fetchPosts = createAsyncThunk(
  "groups/fetchPosts",
  async ({ startPage = 0, perPage = 5 }) => {
    return await getAllPostsFiltered(startPage, perPage);
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
    return await updatePost(postId, postData);
  }
);

export const removePost = createAsyncThunk(
  "groups/removePost",
  async (postId) => {
    await deletePost(postId);
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
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        const { posts, currentPage, totalPages } = action.payload;
        state.posts = [...state.posts, ...posts];
        state.postsPagination.currentPage = currentPage;
        state.postsPagination.totalPages = totalPages;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addPostToGroup.fulfilled, (state, action) => {
        const { groupId, post } = action.payload;

        if (state.selectedGroup?.id === groupId) {
          state.selectedGroup.posts = [
            ...(state.selectedGroup.posts || []),
            post,
          ];
        }

        const group = state.groups.find((g) => g.id === groupId);
        if (group) {
          group.posts = [...(group.posts || []), post];
        }

        const storedGroups = getGroupsFromLocalStorage();
        const groupIndex = storedGroups.findIndex((g) => g.id === groupId);
        if (groupIndex > -1) {
          storedGroups[groupIndex].posts = [
            ...(storedGroups[groupIndex].posts || []),
            post,
          ];
        } else {
          storedGroups.push({ id: groupId, posts: [post] });
        }
        saveGroupsToLocalStorage(storedGroups);
      })
      .addCase(editPost.fulfilled, (state, action) => {
        const updatedPost = action.payload;

        if (state.selectedGroup) {
          state.selectedGroup.posts = state.selectedGroup.posts.map((post) =>
            post.id === updatedPost.id ? updatedPost : post
          );
        }

        const group = state.groups.find((g) =>
          g.posts?.some((post) => post.id === updatedPost.id)
        );
        if (group) {
          group.posts = group.posts.map((post) =>
            post.id === updatedPost.id ? updatedPost : post
          );
        }

        updatePostsInLocalStorage(updatedPost.id, updatedPost);
      })
      .addCase(removePost.fulfilled, (state, action) => {
        const postId = action.payload;

        if (state.selectedGroup) {
          state.selectedGroup.posts = state.selectedGroup.posts?.filter(
            (post) => post.id !== postId
          );
        }

        state.groups.forEach((group) => {
          group.posts = group.posts?.filter((post) => post.id !== postId);
        });

        updatePostsInLocalStorage(postId);
      })
      .addCase(removePost.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default groupSlice.reducer;
