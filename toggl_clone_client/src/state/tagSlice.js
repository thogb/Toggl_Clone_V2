import { createSlice } from "@reduxjs/toolkit";
import { tagsUtil } from "../utils/tagsUtil";
import { ttCloneApi } from "./apiSlice";
import { notificationStatus, notificationsActions } from "./notificationSlice";
import { enqueueSnackbar } from "notistack";
import { updateWorkspaceTag } from "./groupedEntryListSlice";

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
    resetState: () => intitialState,
    populateFromRaw(state, action) {
      const rawTags = action.payload.tags;
      tagsUtil.populateFromRaw(state, rawTags);
    },
    addTag(state, action) {
      const { tag } = action.payload;
      tagsUtil.addTag(state, tag);
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
        tagsUtil.populateFromRaw(state, action.payload);
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

export const tagActions = tagsSlice.actions;
export default tagsSlice.reducer;

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
      async onQueryStarted(
        { tagName, workspaceId },
        { dispatch, queryFulfilled }
      ) {
        try {
          await queryFulfilled;
          enqueueSnackbar({
            message: "Successfully created tag",
            variant: "success",
          });
        } catch (error) {
          enqueueSnackbar({
            message: error.error.data.message,
            variant: "success",
          });
        }
      },
    }),
    deleteTag: builder.mutation({
      query: ({ tagId, workspaceId, localData }) => ({
        url: `workspaces/${workspaceId}/tags/${tagId}`,
        method: "DELETE",
      }),
      async onQueryStarted(
        { tagId, workspaceId, localData },
        { dispatch, queryFulfilled }
      ) {
        const { tag } = localData;
        dispatch(tagActions.removeTag({ tagId, workspaceId }));
        try {
          await queryFulfilled;
          dispatch(
            updateWorkspaceTag({
              workspaceId: workspaceId,
              newTagName: null,
              oldTagName: tag.name,
            })
          );
          enqueueSnackbar({
            message: "Tag deleted successfully",
            variant: "success",
          });
        } catch (error) {
          dispatch(tagActions.addTag({ tag }));
          enqueueSnackbar({
            message: error.message,
            variant: "error",
          });
        }
      },
    }),
    updateTag: builder.mutation({
      query: ({ tagId, workspaceId, tagName }) => ({
        url: `workspaces/${workspaceId}/tags/${tagId}`,
        method: "PUT",
        body: {
          name: tagName,
        },
      }),
      async onQueryStarted(
        { tagId, workspaceId, tagName, localData },
        { dispatch, queryFulfilled }
      ) {
        const { oldTagName } = localData;
        dispatch(tagActions.updateTag({ tagId, workspaceId, tagName }));
        try {
          await queryFulfilled;
          dispatch(
            updateWorkspaceTag({
              workspaceId: workspaceId,
              newTagName: tagName,
              oldTagName: oldTagName,
            })
          );
          enqueueSnackbar({
            message: "Successfully updated tag",
            variant: "success",
          });
        } catch (error) {
          const { data } = error.error;
          dispatch(
            tagActions.updateTag({ tagId, workspaceId, tagName: oldTagName })
          );
          enqueueSnackbar({
            message: data.message,
            variant: "error",
          });
        }
      },
    }),
  }),
});

export const {
  useGetTagsQuery,
  useAddTagMutation,
  useDeleteTagMutation,
  useUpdateTagMutation,
} = extendedApi;
