import {
  createListenerMiddleware,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";
import { ttCloneApi } from "./apiSlice";
import { ttLocalStorage } from "../storage/TTCloneLocalStorage";
import { organisationActions } from "./organisationSlice";
import { workspaceActions } from "./workspaceSlice";
import { projectActions } from "./projectSlice";
import { tagActions } from "./tagSlice";
import { timeEntryActions } from "./groupedEntryListSlice";

const initialState = {
  user: null,
  token: null,
};

const getInitialState = () => {
  const user = ttLocalStorage.getUser();
  const token = ttLocalStorage.getToken();
  if (user && token) {
    return { user, token };
  }
  return initialState;
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      ttLocalStorage.removeToken();
      ttLocalStorage.removeUser();
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        ttCloneApi.endpoints.registerUser.matchFulfilled,
        ttCloneApi.endpoints.loginUser.matchFulfilled
      ),
      (state, action) => {
        console.log(action);
        const { token, ...user } = action.payload;
        state.user = user;
        state.token = token;
        ttLocalStorage.setToken(token);
        ttLocalStorage.setUser(user);
      }
    );
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;

const extendedApi = ttCloneApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: ({ email, password }) => ({
        url: "auth/register",
        method: "POST",
        body: { email, password },
        // validateStatus: (response, result) => {
        //   if (response.status === 200) {
        //     return true;
        //   }
        //   return false;
        // },
      }),
      onQueryStarted: () => {},
    }),
    loginUser: builder.mutation({
      query: ({ email, password }) => ({
        url: "auth/login",
        method: "POST",
        body: { email, password },
        // validateStatus: (response, result) => {
        //   if (response.status === 200) {
        //     return true;
        //   }
        //   return false;
        // },
      }),
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = extendedApi;

export const authListenerMiddleware = createListenerMiddleware();

authListenerMiddleware.startListening({
  actionCreator: authActions.logout,
  effect: (action, listenerApi) => {
    const dispatch = listenerApi.dispatch;
    dispatch(organisationActions.resetState());
    dispatch(workspaceActions.resetState());
    dispatch(timeEntryActions.resetState());
    dispatch(projectActions.resetState());
    dispatch(tagActions.resetState());
  },
});
