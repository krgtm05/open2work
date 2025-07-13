import React from "react";
import axios from "../../axios.js";
import { useState } from "react";
import UserCard from "../../Components/UserCard";
import Spinner from "../../Components/Spinner";

function UserList() {
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchUsers() {
    const res = await axios.get("/api/allusers", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    setIsLoading(false);
    setAllUsers(res.data.allusers);
  }
  fetchUsers();

  return (
    <>
      {isLoading && <Spinner />}
      <div className='grid grid-cols-2 gap-4 '>
        {allUsers.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </>
  );
}

export default UserList;
