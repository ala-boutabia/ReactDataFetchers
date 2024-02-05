import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers, createUser } from "../../../api/local-server";

export const getUserAsync = createAsyncThunk("users/getUsers", async () => {
  // name of the action creator = "getUsers"
  const response = await getUsers();
  return response.data;
});

export const createUserAsync = createAsyncThunk(
  "users/createUser",
  async (name) => {
    const response = await createUser(name);
    return response.data;
  }
);
