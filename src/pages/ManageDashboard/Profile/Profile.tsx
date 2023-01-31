import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
// import { BiCamera } from "react-icons/bi";
import { PulseLoader } from "react-spinners";
import {
  browserName,
  fullBrowserVersion,
  osName,
  osVersion,
} from "react-device-detect";
import { useContext } from "react";
import { InitializeContext } from "../../../App";
import useScrollToTop from "../../../hooks/useScrollToTop";
import { BASE_API } from "../../../config";
import Loader from "../../../components/Loader/Loader";
import auth from "../../../auth/Firebase/firebase.init";
import useUserInfo from "../../../hooks/useUserInfo";
// import { useAuthState } from "react-firebase-hooks/auth";

const Profile = () => {
  useScrollToTop();
  const { appName, isLoading, refetch } = useContext(InitializeContext);
  const [editProfile, setEditProfile] = useState(null as any);
  // const [user] = useAuthState(auth);
  document.title = `${auth?.currentUser?.displayName}'s Profile - ${appName}`;
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false as boolean);
  const onSubmit = (data: any) => {
    setLoading(true);
    saveProfileDataOnMongodb(data);
  };

  const saveProfileDataOnMongodb = async (data: any) => {
    const profileData = {
      education: data?.education,
      number: data?.number,
      address: data?.address,
      facebook: data?.facebook,
      linkedin: data?.linkedin,
      createdAt: new Date().toDateString(),
    };
    await fetch(`${BASE_API}/users?uid=${auth?.currentUser?.uid}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result?.success) {
          toast.success("Profile Updated Successfully");
          reset();
          refetch();
          setLoading(false);
        }
      });
  };

  const [userInfo] = useUserInfo();

  if (isLoading || loading || !userInfo)
    return (
      <div className="md:p-80">
        <Loader />
      </div>
    );

  return (
    <>
      <div className="lg:h-screen">
        <div className=" border-b-2 border-primary py-3">
          <h2 className="text-center text-2xl font-semibold text-white">Profile</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-y-12 my-10 px-1 md:px-10">
          <div className="shadow-xl border-l-4 border-primary rounded-lg relative p-4 order-1 my-8 md:my-0">
            <h2 className="text-xl mb-4 px-4 font-bold text-white">Your Information</h2>
            <label
              htmlFor="editProfile"
              className="btn btn-sm btn-primary btn-circle absolute right-2 top-2"
              onClick={() =>
                setEditProfile(
                  userInfo?.uid
                )
              }
            >
              <i className="bx bx-edit-alt text-white text-lg"></i>
            </label>
            <div className="flex flex-col md:flex-row justify-between items-center px-4 mb-4 text-white">
              <span>Name</span>
              <span>
                {userInfo?.displayName ? userInfo?.displayName : auth?.currentUser?.displayName}
              </span>
            </div>
            <hr className="border-dashed" />

            <div className="flex flex-col md:flex-row justify-between items-center px-4 mb-4 text-white">
              <span>Role</span>
              <span className="badge bg-primary border-primary text-white">
                {userInfo?.role === "admin" ? "Admin" : "User"}
              </span>
            </div>
            <hr className="border-dashed" />
            <div className="flex flex-col md:flex-row justify-between items-center px-4 mb-4 text-white">
              <span>Email</span>

              <span>{auth?.currentUser?.email}</span>
            </div>
            <hr className="border-dashed" />
            <div className="flex flex-col md:flex-row justify-between items-center px-4 mb-4 text-white">
              <span>Contact Number</span>

              <span>{userInfo?.number ? userInfo?.number : "Not Available"}</span>
            </div>
            <hr className="border-dashed" />
            <div className="flex flex-col md:flex-row justify-between items-center px-4 mb-4 text-white">
              <span>Address</span>

              <span>{userInfo?.address ? userInfo?.address : "Not Available"}</span>
            </div>
            <hr className="border-dashed" />
            <div className="flex flex-col md:flex-row justify-between items-center px-4 mb-4 text-white">
              <span>Used Browser</span>
              <span className="badge badge-primary text-white">
                {browserName} {fullBrowserVersion}
              </span>
            </div>
            <hr className="border-dashed" />
            <div className="flex flex-col md:flex-row justify-between items-center px-4 mb-4 text-white">
              <span>Used Device</span>
              <span className="badge badge-primary text-white">
                {osName} {osVersion}
              </span>
            </div>
            <hr className="border-dashed" />
            <div className="flex justify-center items-center py-4 text-white">
              <span>Social Links</span>
            </div>
            <div className="flex justify-center items-center px-4 text-white">
              {userInfo?.linkedin ? (
                <div className="flex items-center gap-2">
                  <a target="_blank" href={userInfo?.linkedin} rel="noreferrer">
                    <FaLinkedin className="text-xl" />
                  </a>
                  <a target="_blank" href={userInfo?.facebook} rel="noreferrer">
                    <FaFacebook className="text-xl" />
                  </a>
                </div>
              ) : (
                <span className="label-text-alt text-white">Not available</span>
              )}
            </div>
          </div>

          <div className="text-center md:order-1">
            <div className="avatar mx-auto border-4 border-primary p-3 rounded-full bg-base-100 shadow-xl">
              {/* <div className=" w-60 rounded-full">
                {auth?.currentUser?.photoURL && !userInfo?.image ? (
                  <img src={auth?.currentUser?.photoURL} alt="profile" />
                ) : !auth?.currentUser?.photoURL && userInfo?.image ? (
                  <img src={userInfo?.image} alt="profile" />
                ) : (
                  <img
                    src="https://i.ibb.co/xY0rfV4/avatar.jpg"
                    alt="profile"
                  />
                )}
              </div> */}
              <div className=" w-60 rounded-full">
                <img src={auth?.currentUser?.photoURL as string} alt="profile" />
              </div>
              {/* <label
                htmlFor="profile-image-edit-modal"
                className="profile-image-edit absolute right-1 bottom-10 text-lg cursor-pointer w-8 h-8 rounded-full grid place-items-center shadow bg-primary text-white "
              >
                <BiCamera />
              </label> */}
            </div>

            <h2 className="mt-4 font-bold text-xl text-white">
              {userInfo?.displayName ? userInfo?.displayName : auth?.currentUser?.displayName}
            </h2>
            <small className="mt-4 font-bold text-white">{auth?.currentUser?.email}</small>
          </div>
        </div>
        {editProfile && (
          <>
            <input type="checkbox" id="editProfile" className="modal-toggle " />
            <div className="modal">
              <div className="modal-box w-full md:w-2/3 lg:w-1/3 max-w-5xl bg-[url('./assets/bg.jpg')]">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="another-info flex items-center justify-center flex-col gap-2 my-3"
                >
                  <div className="name border rounded p-3 relative w-full">
                    <div className="name-title absolute -top-4 bg-base-100 border rounded p-1">
                      <h3 className="text-xs font-poppins">Full Name</h3>
                    </div>
                    <div className="input-group flex items-center my-2 border p-3 rounded-md mt-2 overflow-hidden">
                      <div className="icon text-white">
                        <i className="bx bxs-hot"></i>
                      </div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="input focus:outline-none w-full bg-transparent text-white"
                        required
                        defaultValue={
                          userInfo?.displayName || auth?.currentUser?.displayName
                        }
                        {...register("displayName", { required: true })}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-3 w-full mt-6">
                    <div className="name border rounded p-3 relative w-full">
                      <div className="name-title absolute -top-4 bg-base-100 border rounded p-1">
                        <h3 className="text-xs font-poppins">Put your email</h3>
                      </div>
                      <div
                        className="input-group flex items-center my-2 border p-3 rounded-md mt-2
                      bg-base-200"
                      >
                        <div className="icon">
                          <i className="bx bx-message"></i>
                        </div>
                        <input
                          type="text"
                          placeholder="Email"
                          defaultValue={userInfo?.email}
                          required
                          className="input focus:outline-none w-full bg-base-200"
                          readOnly
                          style={{ cursor: "not-allowed", userSelect: "none" }}
                        />
                      </div>
                    </div>
                    <div className="name border rounded p-3 relative w-full mt-6 md:mt-0">
                      <div className="name-title absolute -top-4 bg-base-100 border rounded p-1">
                        <h3 className="text-xs font-poppins">Number</h3>
                      </div>
                      <div className="input-group flex items-center my-2 border p-3 rounded-md mt-2 overflow-hidden">
                        <div className="icon text-white">
                          <i className="bx bxs-hot"></i>
                        </div>
                        <input
                          type="number"
                          placeholder="Phone Number"
                          defaultValue={userInfo?.number}
                          required
                          className="input focus:outline-none w-full bg-transparent text-white"
                          {...register("number", { required: true })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="name border rounded p-3 relative w-full mt-6">
                    <div className="name-title absolute -top-4 bg-base-100 border rounded p-1">
                      <h3 className="text-xs font-poppins">Address</h3>
                    </div>
                    <div className="input-group flex items-center my-2 border p-3 rounded-md mt-2 overflow-hidden">
                      <div className="icon text-white">
                        <i className="bx bxs-hot"></i>
                      </div>
                      <input
                        type="text"
                        placeholder="Address"
                        className="input focus:outline-none w-full bg-transparent text-white"
                        required
                        defaultValue={userInfo?.address}
                        {...register("address", { required: true })}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-3 w-full">
                    <div className="name border rounded p-3 relative w-full mt-6">
                      <div className="name-title absolute -top-4 bg-base-100 border rounded p-1">
                        <h3 className="text-xs font-poppins">
                          Social Media Links
                        </h3>
                      </div>
                      <div className="input-group flex items-center my-2 border p-3 rounded-md mt-2 overflow-hidden">
                        <div className="icon text-white">
                          <i className="bx bxl-linkedin"></i>
                        </div>
                        <input
                          type="link"
                          placeholder="LinkedIn Link"
                          defaultValue={userInfo?.linkedin}
                          className="input focus:outline-none w-full bg-transparent text-white"
                          {...register("linkedin", { required: true })}
                        />
                        {errors.linkedin?.type === "required" && (
                          <span className="text-error">
                            LinkedIn URL is required
                          </span>
                        )}
                      </div>

                      <div className="input-group flex items-center my-2 border p-3 rounded-md mt-2 overflow-hidden">
                        <div className="icon text-white">
                          <i className="bx bxl-facebook-circle"></i>
                        </div>
                        <input
                          type="text"
                          placeholder="Facebook Link"
                          defaultValue={userInfo?.facebook}
                          className="input focus:outline-none w-full bg-transparent text-white"
                          {...register("facebook", { required: true })}
                        />
                        {errors.facebook?.type === "required" && (
                          <span className="text-error">
                            Facebook URL is required
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="modal-action">
                    <label htmlFor="editProfile" className="btn btn-warning">
                      <i className="bx bx-x text-xl"></i> Close
                    </label>
                    {isLoading ? (
                      <button className="btn btn-primary" type="button">
                        <PulseLoader size={8} color="#fff" />
                      </button>
                    ) : (
                      <button className="btn btn-success" type="submit">
                        <i className="bx bxs-pen text-lg"></i> Update Profile
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
