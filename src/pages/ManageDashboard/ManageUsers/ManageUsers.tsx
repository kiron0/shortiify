import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BASE_API } from "../../../config";
import useScrollToTop from "../../../hooks/useScrollToTop";
import useTitle from "../../../hooks/useTitle";
import UserRow from "./UserRow";
import Loading from "../../../components/Loading/Loading";
import Pagination from "./Pagination";

const Fade = require("react-reveal/Fade");

export default function ManageUsers() {
  useScrollToTop();
  useTitle("Manage All Users");
  const [pageLoading, setPageLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [size] = useState(10);

  const {
    data,
    isLoading,
    refetch,
  } = useQuery(["users"], () =>
    fetch(`${BASE_API}/users/all?page=${page}&limit=${size}`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  useEffect(() => {
    setPageLoading(true);
    refetch();
    setPageLoading(false);
  }, [page, refetch]);

  const usersArray = data?.users;
  const pageNumber = data?.totalPages;


  if (isLoading || !usersArray || !usersArray?.length || pageLoading) {
    return <Loading />;
  }


  return (
    <div className="lg:px-10 py-0 md:py-8 rounded-md pb-12">
      <div className="title my-2 mb-10">
        <h3 className="text-2xl font-semibold text-white">Manage Users</h3>
        <span className="text-white">You can manage all the users whom are already registered</span>
      </div>
      <Fade top distance="20px">
        <div className="overflow-x-auto shadow-xl rounded-xl">
          <table className="table w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Change User Role</th>
                <th>Role</th>
                <th>isLogin</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersArray?.map((user: any, index: number) => (
                <UserRow
                  index={index}
                  key={user._id}
                  userObj={user}
                  refetch={refetch}
                ></UserRow>
              ))}
            </tbody>
          </table>
        </div>
      </Fade>

      <Pagination page={page} setPage={setPage} totalPages={pageNumber} />
    </div>
  );
};
