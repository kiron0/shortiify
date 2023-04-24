import React from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { BASE_API } from "../../../config";
import auth from "../../../auth/Firebase/firebase.init";
import useScrollToTop from "../../../hooks/useScrollToTop";
import { useAuthState } from "react-firebase-hooks/auth";
import useUserRole from "../../../hooks/useUserRole";
import moment from 'moment';

type UserRowProps = {
  userObj: {
    email: string;
    role: string;
    uid: string;
    image: string;
    displayName: string;
    lastLogin: string;
  };
  index: number;
  refetch: () => void;
};

const UserRow = ({ userObj, index, refetch }: UserRowProps) => {
  useScrollToTop();
  const { email, role, uid, image, displayName, lastLogin } = userObj;
  const [user] = useAuthState(auth);
  const [userRole] = useUserRole(user);

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const userRole = e.target.value.toLowerCase() as string;

    fetch(`${BASE_API}/user/roleChange`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        userRole,
        email,
      }),
    })
      .then((res) => {
        if (res.status === 403) {
          toast.error("Failed to Make an admin");
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          refetch();
          Swal.fire({
            title: "Success!",
            text: `${email} is now ${e.target.value}`,
            icon: "success",
          });
        }
      });
  };

  /* Handle Delete User */
  const handleUserDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      background: "#333",
      color: "#fff",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((willDelete: any) => {
      if (willDelete.isConfirmed) {
        fetch(`${BASE_API}/user/deleteUser?email=${email}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: `${email} has been deleted.`,
                icon: "success",
              });
              refetch();
            }
          });
      }
    });
  };

  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        {auth?.currentUser?.uid === uid ? (
          <span>
            <img
              src={image}
              alt=""
              className="rounded-full w-[2.5rem] h-[2.5rem] shadow-sm border-2 border-error p-1"
            />
          </span>
        ) : (
          <span>
            <img
              src={image}
              alt=""
              className="rounded-full w-[2.5rem] h-[2.5rem] shadow-sm border p-1"
            />
          </span>
        )}
      </td>
      <td className="select-none">
        <span className="tooltip" data-tip={uid ? uid : "Not available"}>
          {displayName ? displayName : "Not Available"}
        </span>
      </td>
      <td className="select-none">{email}</td>
      <td>
        {email === "toufiqhasankiron2@gmail.com" ||
          auth?.currentUser?.uid === uid ? (
          <></>
        ) : (
          <span className="tooltip" data-tip="Change user role">
            <select
              className={`select select-bordered w-full max-w-xs ${userRole === "developer" ? "" : "btn-disabled"} ${role === "developer" ? "select-primary" : role === "admin" ? "select-secondary" : "select-neutral"} select-sm
                }`}
              defaultValue={
                role === "admin"
                  ? "Admin"
                  : role === "premium user"
                    ? "Premium User"
                    : role === "developer"
                      ? "Developer"
                      : "User"
              }
              onChange={handleRoleChange}
            >
              <option disabled selected>
                Select Role
              </option>
              <option>User</option>
              <option>Admin</option>
              <option>Developer</option>
            </select>
          </span>
        )}
      </td>
      <td>
        {role === "admin" ? (
          <span className="badge badge-secondary badge-outline p-3 select-none">
            Admin
          </span>
        )
          : role === "developer" ? (
            <span className="badge badge-primary badge-outline p-3 select-none">
              🔥Developer🔥
            </span>
          )
            : (
              <span className="badge badge-outline p-3 select-none">
                User
              </span>
            )}
      </td>
      <td className="select-none">
        {auth?.currentUser?.uid === uid ? (
          <span className="badge badge-error text-white">Active </span>
        ) : (
          ""
        )}
      </td>
      <td>
        <span className="tooltip" data-tip="Last login">
          {
            lastLogin ? (
              <>
                {moment(lastLogin).fromNow()}
              </>
            ) : (
              <span className="badge badge-neutral text-white">Not available</span>
            )
          }
        </span>
      </td>
      <td>
        {email === "toufiqhasankiron2@gmail.com" ||
          auth?.currentUser?.uid === uid ? (
          <></>
        ) : (
          <span className="tooltip tooltip-error" data-tip="Delete user data!">
            <button
              onClick={handleUserDelete}
              className={`btn btn-xs btn-accent text-white ${userRole === "developer" ? "" : "btn-disabled"}`}
            >
              <i className="bx bxs-trash"></i>
            </button>
          </span>
        )}
      </td>
    </tr>
  );
};

export default UserRow;
