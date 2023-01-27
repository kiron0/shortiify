import React from "react";
import { useQuery } from "@tanstack/react-query";
import { BASE_API } from "../../../config";
import useScrollToTop from "../../../hooks/useScrollToTop";
import useTitle from "../../../hooks/useTitle";
import Loader from "../../../components/Loader/Loader";
import UserRow from "./UserRow";

const Fade = require("react-reveal/Fade");

const ManageUsers = () => {
  useScrollToTop();
  useTitle("Manage All Users");
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery(["users"], () =>
    fetch(`${BASE_API}/users/all`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading || !users || !users.length) {
    return <Loader />;
  }
  return (
    <div className="lg:px-10 py-0 md:py-8 bg-base-100 rounded-md pb-12">
      <div className="title my-2 mb-10">
        <h3 className="text-2xl font-semibold">Manage Users</h3>
        <span>You can manage all the users whom are already registered</span>
      </div>
      <Fade top distance="20px">
        <div className="overflow-x-auto shadow-xl rounded-xl">
          <table className="table w-full">
            <thead className="bg-base-300">
              <tr>
                <th>No</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Change User Role</th>
                <th>Role</th>
                <th>isLogin</th>
                <th>All URLs</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user: any, index: number) => (
                <UserRow
                  index={index}
                  key={user._id}
                  user={user}
                  refetch={refetch}
                ></UserRow>
              ))}
            </tbody>
          </table>
        </div>
      </Fade>
    </div>
  );
};

export default ManageUsers;
