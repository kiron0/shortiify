import React, { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { toast } from 'react-hot-toast'
import Swal from "sweetalert2";
import { BASE_API } from '../../../config'
import { FaRegEye } from 'react-icons/fa';
import { BsClipboard } from 'react-icons/bs';
import Loading from '../../../components/Loading/Loading';
import { useForm } from 'react-hook-form';

type Props = {
          item: any,
          refetch: any,
          isLoading: boolean
}

export default function LinksCard({ item, refetch, isLoading }: Props) {
          const [isEdit, setIsEdit] = useState<boolean>(false);
          const [input, setInput] = useState(item?.slug);
          const { setValue } = useForm();

          useEffect(() => {
                    setValue("slug", item?.slug);
          }, [setValue, item?.slug]);

          const deleteUrl = () => {
                    Swal.fire({
                              title: "Are you sure?",
                              text: "You won't be able to revert this!",
                              icon: "warning",
                              background: "#333",
                              color: "#fff",
                              showCancelButton: true,
                              confirmButtonText: "Yes, delete it!",
                    }).then((willDelete: any) => {
                              if (willDelete.isConfirmed) {
                                        const uid = localStorage.getItem("uid");
                                        fetch(`${BASE_API}/user/url/delete?uid=${uid}&&slug=${item?.slug}`, {
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
                              confirmButtonText: "Yes, update it!",
                    }).then((willDelete: any) => {
                              if (willDelete.isConfirmed) {
                                        if (input === "") {
                                                  toast.error("Slug cannot be empty");
                                                  return;
                                        } else if (input?.length !== 6) {
                                                  toast.error("Slug must be 6 characters long");
                                                  return;
                                        } else {
                                                  fetch(`${BASE_API}/user/getSlug?slug=${input}&&id=${item?._id}`, {
                                                            method: "PATCH",
                                                            headers: {
                                                                      "Content-Type": "application/json",
                                                                      authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                                                            },
                                                            body: JSON.stringify({
                                                                      slug: input,
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
                                                                                toast.success(data.message);
                                                                                refetch();
                                                                                setIsEdit(false);
                                                                      }
                                                            })
                                        }
                              }
                    })
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
                                        <p className='text-white'><a href={item?.url} target="_blank" rel="noopener noreferrer">{item?.url.length > 35 ? item?.url?.slice(0, 35) + "..." : item?.url}</a></p>
                                        {isEdit ? (
                                                  <div className='flex justify-center items-center'>
                                                            <p className='text-gray-400'>{window.location.origin}/k/</p>
                                                            <form className='flex items-center justify-center ml-1 lg:mr-4' onSubmit={handleUpdateSlug}>
                                                                      <input
                                                                                type="text"
                                                                                onChange={(e) => setInput(e.target.value)}
                                                                                defaultValue={item?.slug}
                                                                                className="input input-bordered border-1 border-white input-sm bg-transparent w-full text-white"
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
                                                                                onClick={() => setIsEdit(false)}
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
                                                                      onClick={() => setIsEdit(true)}
                                                            >
                                                                      <i className="bx bx-edit-alt text-xl"></i>
                                                            </span>
                                                  </div>
                                        )}
                                        <div className='flex justify-center items-center'>
                                                  <p className='flex items-center gap-2 text-white'><FaRegEye className='text-lg' />{numberWithCommas(item?.views)} Views</p>
                                                  <div className='flex items-center gap-3'>
                                                            <CopyToClipboard text={`${window.location.origin}/k/${item?.slug}`} onCopy={() => {
                                                                      toast.success('URL Copied To Clipboard..!', {
                                                                                icon: "✋",
                                                                                duration: 3000,
                                                                      });
                                                            }}>
                                                                      <BsClipboard className='text-primary text-lg cursor-pointer' />
                                                            </CopyToClipboard>
                                                            <i className='bx bx-trash cursor-pointer text-error text-xl' onClick={deleteUrl}></i>
                                                  </div>
                                        </div>
                                        <p className='text-white'>{item?.createdAt}</p>
                              </div>
                    </div>
          )
}
