import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Loading from "../../../components/Loading/Loading";
import { InitializeContext } from "../../../App";
import useTitle from "../../../hooks/useTitle";
import useScrollToTop from "../../../hooks/useScrollToTop";
import { BASE_API } from "../../../config";
import auth from "../../../auth/Firebase/firebase.init";
import Swal from "sweetalert2";
import useUserRole from "../../../hooks/useUserRole";

export default function Setting() {
  useTitle("Setting");
  useScrollToTop();
  const { appName, refetch } = useContext(InitializeContext);
  const [user, isLoading] = useAuthState(auth);
  const [userRole, userRoleLoading] = useUserRole(user);
  const [isEdit, setIsEdit] = useState(false);
  const { setValue } = useForm();
  const [input, setInput] = useState(appName);


  const handleChangeAppName = async (e: any) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      background: "#333",
      color: "#fff",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    }).then((willDelete: any) => {
      if (willDelete.isConfirmed) {
        Swal.fire({
          title: `Are you sure you want to change the app name?`,
          input: "text",
          inputPlaceholder: "Type 'changeName' to confirm",
          background: "#333",
          color: "#fff",
          inputAttributes: {
            autocapitalize: "off",
            autocorrect: "off",
            maxlength: 10,
          },
          showCancelButton: true,
          confirmButtonText: "Confirm",
          showLoaderOnConfirm: true,
          preConfirm: (confirm: any) => {
            if (confirm !== "changeName") {
              Swal.showValidationMessage(`You must type 'changeName' to confirm`);
            } else {
              try {
                fetch(`${BASE_API}/app/changeAppName`, {
                  method: "PATCH",
                  headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                  },
                  body: JSON.stringify({ appName: input }),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.success) {
                      Swal.fire({
                        title: "Success!",
                        icon: "success",
                        text: "App name has been changed.",
                        background: "#333",
                        color: "#fff",
                        confirmButtonColor: "#3085d6",
                        confirmButtonText: "Ok, cool!",
                      });
                      refetch();
                      setIsEdit(false);
                    } else {
                      toast.error(data.message);
                    }
                  });
              } catch (error: string | any) {
                toast.error(error.response.data.message);
              }
            }
          },
        });
      }
    });
  }


  useEffect(() => {
    setValue("appName", appName);
  }, [setValue, appName]);

  if (isLoading || userRoleLoading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <div className="p-5 my-4 font-poppins">
          <h3 className="text-2xl font-bold mb-3 text-white">Settings</h3>

          <div className="settings-content">
            {userRole === "developer" && (
              <div className="flex flex-col sm:flex-row items-center justify-between py-6 rounded my-4 text-white px-5">
                <h2 className="text-xl font-bold pb-3 md:pb-0">
                  Change App Name
                </h2>
                <form
                  onSubmit={handleChangeAppName}
                  className="flex items-center gap-3"
                >
                  {isEdit ? (
                    <input
                      type="text"
                      onChange={(e) => setInput(e.target.value)}
                      defaultValue={appName}
                      placeholder="Change App Name"
                      className="input input-bordered border-1 border-white input-sm bg-transparent"
                      autoComplete="off"
                    />
                  ) : (
                    <h2 className="text-xl">{appName}</h2>
                  )}

                  {isEdit ? (
                    <>
                      <button
                        type="submit"
                        className="cursor-pointer text-primary font-bold text-2xl"
                      >
                        <i className='bx bx-check'></i>
                      </button>{" "}
                      <span
                        className="cursor-pointer text-error font-bold text-2xl"
                        onClick={() => setIsEdit(false)}
                      >
                        <i className="bx bx-x text-2xl"></i>
                      </span>
                    </>
                  ) : (
                    <span
                      className="cursor-pointer text-primary font-bold"
                      onClick={() => setIsEdit(true)}
                    >
                      <i className="bx bx-edit-alt text-xl"></i>
                    </span>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
