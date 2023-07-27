import { createSlice } from "@reduxjs/toolkit";

export const notificationStatus = {
  success: "success",
  error: "error",
  info: "info",
};

const initialState = {
  // notifications: [
  //     {
  //         status: "success" | "error" | "info",
  //         message: "string",
  //         action: {
  //             name: "undo",
  //             callback: () => {}
  //         }
  //     }
  // ],
  notifications: [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: initialState,
  reducers: {
    addNotification: (state, action) => {
      const { notification } = action.payload;
      state.notifications.push(notification);
    },
    clearNotification: (state) => {
      state.notifications = [];
    },
  },
});

export const notificationsActions = notificationsSlice.actions;
export default notificationsSlice.reducer;
