import React from "react";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { InitializeContext } from "../../../App";
import { BASE_API } from "../../../config";
import auth from "../../../auth/Firebase/firebase.init";
import avatar from "../../../assets/avatar.jpg";
import useScrollToTop from "../../../hooks/useScrollToTop";

type UserRowProps = {
  user: {
    _id: string;
    email: string;
    role: string;
    uid: string;
    image: string;
    displayName: string;
  };
  index: number;
  refetch: () => void;
};

const UserRow = ({ user, index, refetch }: UserRowProps) => {
  useScrollToTop();
  const { theme } = useContext(InitializeContext);
  const { _id, email, role, uid, image, displayName } = user;

  /* Handle Delete User */
  const handleUserDelete = (id: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      background: theme === "night" ? "#333" : "#fff",
      color: theme === "night" ? "#fff" : "#333",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((willDelete: any) => {
      if (willDelete.isConfirmed) {
        fetch(`${BASE_API}/user/${email}`, {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.deletedCount) {
              toast.success(`${email} is deleted.`);
              refetch();
            }
          });
      }
    });
  };

  const makeAdmin = () => {
    fetch(`${BASE_API}/user/admin`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.status === 403) {
          toast.error("Failed to Make an admin");
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Success!",
            text: `${email} is now an admin.`,
            icon: "success",
          });
        }
      });
  };
  const removeAdmin = () => {
    fetch(`${BASE_API}/user/removeAdmin`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.status === 403) {
          toast.error("Failed to Remove an admin");
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Success!",
            text: `${email} is user now.`,
            icon: "success",
          });
        }
      });
  };

  return (
    <tr>
      <th>{index + 1}</th>
      <td>
        {image ? (
          <a href={image} target="_blank" rel="noreferrer">
            <img
              src={image}
              alt=""
              className="rounded-full w-[2.5rem] h-[2.5rem] shadow-sm bg-base-200 border p-1"
            />
          </a>
        ) : (
          <img
            src={avatar}
            alt=""
            className="rounded-full w-[2.5rem] h-[2.5rem] shadow-sm bg-base-200 border p-1"
          />
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
              className={`select select-bordered w-full max-w-xs ${role === "admin" ? "select-secondary" : ""
                }`}
              defaultValue={
                role === "admin"
                  ? "Admin"
                  : role === "superAdmin"
                    ? "Super Admin"
                    : "User"
              }
              onChange={(e) => {
                if (e.target.value === "Admin") {
                  makeAdmin();
                } else {
                  removeAdmin();
                }
              }}
            >
              <option disabled selected>
                Select Role
              </option>
              <option>User</option>
              <option>Admin</option>
            </select>
          </span>
        )}
      </td>
      {email === "toufiqhasankiron2@gmail.com" ? (
        <td>
          <span className="badge badge-outline p-3 select-none">
            🔥Developer🔥
          </span>
        </td>
      ) : (
        <td>
          {role === "admin" ? (
            <span className="badge badge-primary select-none text-white">
              Admin
            </span>
          ) : (
            <span className="badge badge-neutral select-none text-white">
              User
            </span>
          )}
        </td>
      )}
      <td className="select-none">
        {auth?.currentUser?.uid === uid ? (
          <span className="badge badge-error text-white">Active </span>
        ) : (
          ""
        )}
      </td>
      <td>
        {email === "toufiqhasankiron2@gmail.com" ||
          auth?.currentUser?.uid === uid ? (
          <></>
        ) : (
          <span className="tooltip tooltip-error" data-tip="Delete user data!">
            <button
              onClick={() => handleUserDelete(_id)}
              className="btn btn-sm btn-accent text-white"
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
