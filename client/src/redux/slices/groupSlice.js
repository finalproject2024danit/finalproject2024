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

        // Оновлюємо вибрану групу
        if (state.selectedGroup?.id === groupId) {
          state.selectedGroup.posts = [
            ...(state.selectedGroup.posts || []),
            post,
          ];
        }

        // Оновлюємо групу в списку
        const group = state.groups.find((g) => g.id === groupId);
        if (group) {
          group.posts = [...(group.posts || []), post];
        }

        // Оновлення localStorage
        let storedGroups = [];
        try {
          storedGroups = JSON.parse(localStorage.getItem("groups")) || [];
        } catch (error) {
          console.error("Error parsing groups from localStorage:", error);
        }

        const groupIndex = storedGroups.findIndex((g) => g.id === groupId);
        if (groupIndex > -1) {
          storedGroups[groupIndex].posts = storedGroups[groupIndex].posts || [];
          storedGroups[groupIndex].posts.push(post);
        } else {
          storedGroups.push({
            id: groupId,
            posts: [post],
          });
        }

        try {
          localStorage.setItem("groups", JSON.stringify(storedGroups));
        } catch (error) {
          console.error("Failed to update localStorage:", error);
        }
      })
      .addCase(addPostToGroup.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        const updatedPost = action.payload;

        // Оновлення посту у вибраній групі
        if (state.selectedGroup) {
          state.selectedGroup.posts = state.selectedGroup.posts.map((post) =>
            post.id === updatedPost.id ? updatedPost : post
          );
        }

        // Оновлення посту у списку груп
        const group = state.groups.find((g) =>
          g.posts?.some((post) => post.id === updatedPost.id)
        );
        if (group) {
          group.posts = group.posts.map((post) =>
            post.id === updatedPost.id ? updatedPost : post
          );
        }
      })
      .addCase(editPost.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(removePost.fulfilled, (state, action) => {
        const postId = action.payload;

        // Видалення посту з вибраної групи
        if (state.selectedGroup) {
          state.selectedGroup.posts = state.selectedGroup.posts?.filter(
            (post) => post.id !== postId
          );
        }

        // Видалення посту зі списку груп
        state.groups.forEach((group) => {
          group.posts = group.posts?.filter((post) => post.id !== postId);
        });
      })
      .addCase(removePost.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default groupSlice.reducer;
