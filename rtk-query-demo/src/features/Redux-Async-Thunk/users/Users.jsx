import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUserAsync, getUserAsync } from "./actions";
const Users = () => {
  const [inputValue, setInputValue] = useState("");
  const users = useSelector((state) => state.users.data);
  const dispatch = useDispatch();
  const addUser = () => {
    dispatch(createUserAsync(inputValue));
    setInputValue("");
  };
  useEffect(() => {
    dispatch(getUserAsync());
  }, [dispatch]);
  return (
    <div>
      {users && <div>Total: {users.length} </div>}
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={addUser}>Add User</button>
      </div>
      <div>
        {users?.map((user, index) => (
          <div key={index}> {user.name} </div>
        ))}
      </div>
    </div>
  );
};
export default Users;
