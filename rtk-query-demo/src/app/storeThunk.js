import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/Redux-Async-Thunk/users/usersSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export default store;
