import React, { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { toast } from 'react-hot-toast'
import Swal from "sweetalert2";
import { BASE_API } from '../../../config'
import { FaRegEye } from 'react-icons/fa';
import { BsClipboardHeart } from 'react-icons/bs';
import Loading from '../../../components/Loading/Loading';
import { useForm } from 'react-hook-form';
import { HiOutlinePencilAlt } from 'react-icons/hi';

type Props = {
          item: any,
          refetch: any,
          isLoading: boolean
}

export default function LinksCard({ item, refetch, isLoading }: Props) {
          const [isEditSlug, setIsEditSlug] = useState<boolean>(false);
          const [isEditUrl, setIsEditUrl] = useState<boolean>(false);
          const [inputSlug, setInputSlug] = useState(item?.slug);
          const [inputUrl, setInputUrl] = useState(item?.url);
          const { setValue } = useForm();

          useEffect(() => {
                    setValue("slug", item?.slug);
          }, [setValue, item?.slug]);

          useEffect(() => {
                    setValue("url", item?.url);
          }, [setValue, item?.url]);

          const deleteUrl = (slug: any) => {
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
                                                  title: `Are you sure you want to delete the URL?`,
                                                  input: "text",
                                                  inputPlaceholder: "Type 'deleteURL' to confirm",
                                                  background: "#333",
                                                  color: "#fff",
                                                  inputAttributes: {
                                                            autocapitalize: "off",
                                                            autocorrect: "off",
                                                            maxlength: 9,
                                                  },
                                                  showCancelButton: true,
                                                  confirmButtonText: "Confirm",
                                                  showLoaderOnConfirm: true,
                                                  preConfirm: (confirm: any) => {
                                                            if (confirm !== "deleteURL") {
                                                                      Swal.showValidationMessage(`You must type 'deleteURL' to confirm`);
                                                            } else {
                                                                      const uid = localStorage.getItem("uid");
                                                                      fetch(`${BASE_API}/user/url/delete?uid=${uid}&&slug=${slug}`, {
                                                                                method: "DELETE",
                                                                                headers: {
                                                                                          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                                                                                },
                                                                      }).then((res) => res.json()).then((data) => {
                                                                                if (data?.error) {
                                                                                          toast.error(data?.error);
                                                                                          return;
                                                                                }
                                                                                Swal.fire({
                                                                                          title: "Deleted!",
                                                                                          text: "Your url has been deleted.",
                                                                                          icon: "success",
                                                                                          background: "#333",
                                                                                          color: "#fff",
                                                                                          confirmButtonText: "Ok, Got it!",
                                                                                });
                                                                                refetch();
                                                                      })
                                                            }
                                                  },
                                        });
                              }
                    });
          }

          const isValidURL = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i;

          const handleUpdateUrl = (e: React.SyntheticEvent) => {
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
                                                  title: `Are you sure you want to update the URL?`,
                                                  input: "text",
                                                  inputPlaceholder: "Type 'updateURL' to confirm",
                                                  background: "#333",
                                                  color: "#fff",
                                                  inputAttributes: {
                                                            autocapitalize: "off",
                                                            autocorrect: "off",
                                                            maxlength: 9,
                                                  },
                                                  showCancelButton: true,
                                                  confirmButtonText: "Confirm",
                                                  showLoaderOnConfirm: true,
                                                  preConfirm: (confirm: any) => {
                                                            if (confirm !== "updateURL") {
                                                                      Swal.showValidationMessage(`You must type 'updateURL' to confirm`);
                                                            } else {
                                                                      if (inputUrl === "") {
                                                                                toast.error("Url cannot be empty");
                                                                                return;
                                                                      } else if (!isValidURL.test(inputUrl)) {
                                                                                toast.error("Url is not valid");
                                                                                return;
                                                                      } else {
                                                                                fetch(`${BASE_API}/user/getUrl?url=${inputUrl}&id=${item?._id}`, {
                                                                                          method: "PATCH",
                                                                                          headers: {
                                                                                                    "Content-Type": "application/json",
                                                                                                    authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                                                                                          },
                                                                                          body: JSON.stringify({
                                                                                                    url: inputUrl,
                                                                                          }),
                                                                                }).then((res) => res.json())
                                                                                          .then((data) => {
                                                                                                    Swal.fire({
                                                                                                              title: "Updated!",
                                                                                                              text: `${data.message}`,
                                                                                                              icon: "success",
                                                                                                              background: "#333",
                                                                                                              color: "#fff",
                                                                                                              confirmButtonText: "Ok, Cool!",
                                                                                                    })
                                                                                                    refetch();
                                                                                                    setIsEditUrl(false);
                                                                                          })
                                                                      }
                                                            }
                                                  },
                                        });
                              }
                    });
          }

          const handleUpdateSlug = (e: React.SyntheticEvent) => {
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
                                                  title: `Are you sure you want to update the Slug?`,
                                                  input: "text",
                                                  inputPlaceholder: "Type 'updateSLUG' to confirm",
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
                                                            if (confirm !== "updateSLUG") {
                                                                      Swal.showValidationMessage(`You must type 'updateSLUG' to confirm`);
                                                            } else {
                                                                      if (inputSlug === "") {
                                                                                toast.error("Slug cannot be empty");
                                                                                return;
                                                                      } else if (inputSlug?.length !== 6) {
                                                                                toast.error("Slug must be 6 characters long");
                                                                                return;
                                                                      } else {
                                                                                fetch(`${BASE_API}/user/getSlug?slug=${inputSlug}&id=${item?._id}`, {
                                                                                          method: "PATCH",
                                                                                          headers: {
                                                                                                    "Content-Type": "application/json",
                                                                                                    authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                                                                                          },
                                                                                          body: JSON.stringify({
                                                                                                    slug: inputSlug,
                                                                                          }),
                                                                                }).then((res) => res.json())
                                                                                          .then((data) => {
                                                                                                    if (data?.message === "Slug already exists") {
                                                                                                              Swal.fire({
                                                                                                                        title: "Slug already exists",
                                                                                                                        icon: "warning",
                                                                                                                        background: "#333",
                                                                                                                        color: "#fff",
                                                                                                                        confirmButtonText: "Ok, Got it!",
                                                                                                              })
                                                                                                              return;
                                                                                                    } else {
                                                                                                              Swal.fire({
                                                                                                                        title: "Updated!",
                                                                                                                        text: `${data.message}`,
                                                                                                                        icon: "success",
                                                                                                                        background: "#333",
                                                                                                                        color: "#fff",
                                                                                                                        confirmButtonText: "Ok, Cool!",
                                                                                                              })
                                                                                                              refetch();
                                                                                                              setIsEditSlug(false);
                                                                                                    }
                                                                                          })
                                                                      }
                                                            }
                                                  },
                                        });
                              }
                    });
          }

          // Add commas or spaces to group every three digits
          const numberWithCommas = (x: number) => {
                    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          }

          if (isLoading) return (
                    <Loading />
          )

          return (
                    <div className="card w-full bg-[url('./assets/bg.jpg')]">
                              <div className="card-body">
                                        {
                                                  isEditUrl ? (
                                                            <div className='flex justify-center items-center'>
                                                                      <form className='flex items-center justify-center w-full' onSubmit={handleUpdateUrl}>
                                                                                <input
                                                                                          type="text"
                                                                                          onChange={(e) => setInputUrl(e.target.value)}
                                                                                          defaultValue={item?.url}
                                                                                          className="input input-bordered border-1 border-white input-sm max-w-lg bg-transparent w-full text-white mr-2"
                                                                                          autoComplete="off"
                                                                                />
                                                                                <button
                                                                                          type="submit"
                                                                                          className="cursor-pointer text-primary font-bold text-2xl"
                                                                                >
                                                                                          <i className='bx bx-check'></i>
                                                                                </button>{" "}
                                                                                <span
                                                                                          className="cursor-pointer text-error font-bold text-4xl pb-1"
                                                                                          onClick={() => setIsEditUrl(false)}
                                                                                >
                                                                                          <i className="bx bx-x text-2xl"></i>
                                                                                </span>
                                                                      </form>
                                                            </div>
                                                  ) :
                                                            (
                                                                      <div className='flex justify-between items-center'>
                                                                                <p className='text-white'><a href={item?.url} target="_blank" rel="noopener noreferrer">{item?.url?.length > 35 ? item?.url?.slice(0, 35) + "..." : item?.url}</a></p>
                                                                                <span
                                                                                          className="cursor-pointer text-primary font-bold"
                                                                                          onClick={() => setIsEditUrl(true)}
                                                                                >
                                                                                          <i className="bx bx-pen text-lg"></i>
                                                                                </span>
                                                                      </div>
                                                            )
                                        }
                                        {isEditSlug ? (
                                                  <div className='flex justify-center items-center'>
                                                            <p className='text-gray-400'>{window.location.origin}/k/</p>
                                                            <form className='flex items-center justify-between ml-1' onSubmit={handleUpdateSlug}>
                                                                      <input
                                                                                type="text"
                                                                                onChange={(e) => setInputSlug(e.target.value)}
                                                                                defaultValue={item?.slug}
                                                                                className="input input-bordered border-1 border-white input-sm bg-transparent w-full text-white mr-2"
                                                                                autoComplete="off"
                                                                      />
                                                                      <button
                                                                                type="submit"
                                                                                className="cursor-pointer text-primary font-bold text-2xl"
                                                                      >
                                                                                <i className='bx bx-check'></i>
                                                                      </button>{" "}
                                                                      <span
                                                                                className="cursor-pointer text-error font-bold text-4xl pb-1"
                                                                                onClick={() => setIsEditSlug(false)}
                                                                      >
                                                                                <i className="bx bx-x text-2xl"></i>
                                                                      </span>
                                                            </form>
                                                  </div>
                                        ) : (
                                                  <div className='flex items-center'>
                                                            <p><a className='text-primary flex items-center gap-2 w-48' href={`${window.location.origin}/k/${item?.slug}`} target="_blank" rel="noopener noreferrer">{window.location.origin}/k/{item?.slug}</a></p>
                                                            <span
                                                                      className="cursor-pointer text-primary font-bold"
                                                                      onClick={() => setIsEditSlug(true)}
                                                            >
                                                                      <HiOutlinePencilAlt className='text-lg' />
                                                            </span>
                                                  </div>
                                        )}
                                        <div className='flex justify-center items-center'>
                                                  <p className='flex items-center gap-2 text-white'><FaRegEye className='text-lg' />{numberWithCommas(item?.views)} Views</p>
                                                  <div className='flex items-center gap-3'>
                                                            {
                                                                      !isEditSlug && (
                                                                                <CopyToClipboard text={`${window.location.origin}/k/${item?.slug}`} onCopy={() => {
                                                                                          toast.success('URL Copied To Clipboard..!', {
                                                                                                    icon: "✋",
                                                                                                    duration: 3000,
                                                                                          });
                                                                                }}>
                                                                                          <BsClipboardHeart className='text-primary text-lg cursor-pointer' />
                                                                                </CopyToClipboard>
                                                                      )
                                                            }
                                                            <i className='bx bx-trash cursor-pointer text-error text-xl' onClick={() => deleteUrl(item?.slug)}></i>
                                                  </div>
                                        </div>
                                        <p className='text-white'>{item?.createdAt}</p>
                              </div>
                    </div>
          )
}
