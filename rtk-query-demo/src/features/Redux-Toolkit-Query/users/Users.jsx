import { useState } from "react";
import { useCreateUserMutation, useGetUsersQuery } from "./api/apiSlice.js";

const Users = () => {
  const [inputValue, setInputValue] = useState("");
  const {
    data: users,
    isError,
    error,
    isLoading,
    isSuccess,
  } = useGetUsersQuery();
  const [createUSer] = useCreateUserMutation();

  const addUser = () => {
    createUSer(inputValue);
    setInputValue("");
  };

  return (
    <div>
      {isLoading && !isError && <h1>Loading...</h1>}
      {!isLoading && isError ? <h1>Error: {error.error} </h1> : null}
      {!isLoading && isSuccess && users && <div>Total: {users.length} </div>}
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={addUser}>Add User</button>
      </div>
      <div>
        {!isLoading &&
          isSuccess &&
          users?.map((user, index) => <div key={index}> {user.name} </div>)}
      </div>
    </div>
  );
};

export default Users;
