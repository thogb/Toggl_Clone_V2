import { createSlice } from "@reduxjs/toolkit";
import { tagsUtil } from "../utils/tagsUtil";
import { ttCloneApi } from "./apiSlice";

const intitialState = {
  // tags: {
  //     123: [
  //         {
  //         id: 1,
  //         name: 'react',
  //         workspaceId: 1,
  //         }
  //     ]
  // }
  tags: {},
  // tagNames: {
  //     123: [
  //         name: 'react',
  //     ]
  // }
  tagNames: {},
};

const tagsSlice = createSlice({
  name: "tags",
  initialState: intitialState,
  reducers: {
    populateFromRaw(state, action) {
      const rawTags = action.payload.tags;
      tagsUtil.populateFromRaw(state, rawTags);
    },
    removeTag(state, action) {
      const { tagId, workspaceId } = action.payload;
      tagsUtil.removeTag(state, tagId, workspaceId);
    },
    updateTag(state, action) {
      const { tagId, workspaceId, tagName } = action.payload;
      tagsUtil.updateTag(state, tagId, workspaceId, tagName);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      ttCloneApi.endpoints.getTags.matchFulfilled,
      (state, action) => {
        tagsUtil.populateFromRaw(state, action.payload.tags);
      }
    );
    builder.addMatcher(
      ttCloneApi.endpoints.addTag.matchFulfilled,
      (state, action) => {
        tagsUtil.addTag(state, action.payload);
      }
    );
  },
});

const extendedApi = ttCloneApi.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query({
      query: () => ({
        url: "me/tags",
        method: "GET",
      }),
    }),
    addTag: builder.mutation({
      query: ({ tagName, workspaceId }) => ({
        url: `workspaces/${workspaceId}/tags`,
        method: "POST",
        body: {
          name: tagName,
        },
      }),
    }),
    deleteTag: builder.mutation({
      query: ({ tagId, workspaceId }) => ({
        url: `workspaces/${workspaceId}/tags/${tagId}`,
        method: "DELETE",
      }),
    }),
    updateTag: builder.mutation({
      query: ({ tagId, workspaceId, tagName }) => ({
        url: `workspaces/${workspaceId}/tags/${tagId}`,
        method: "PUT",
        body: {
          name: tagName,
        },
      }),
    }),
  }),
});

export default tagsSlice.reducer;
export const {
  useGetTagsQuery,
  useAddTagMutation,
  useDeleteTagMutation,
  useUpdateTagMutation,
} = extendedApi;
