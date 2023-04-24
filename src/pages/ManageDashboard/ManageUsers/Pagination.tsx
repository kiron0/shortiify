import React from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

interface PaginationProps {
          page: number;
          setPage: (page: number) => void;
          totalPages: number;
}

export default function Pagination({ page, setPage, totalPages }: PaginationProps) {

          return (
                    <>
                              {totalPages > 0 ? (
                                        <div className="text-center">
                                                  <div className="btn-group py-5">
                                                            <button
                                                                      onClick={() => setPage(page - 1)}
                                                                      className={`btn btn-outline btn-sm ${page === 1 ? "btn-disabled" : "btn-primary"}`}
                                                            >
                                                                      <BiLeftArrow />
                                                            </button>

                                                            {[...Array(totalPages)?.keys()]?.map((number: number) => (
                                                                      <button
                                                                                key={number}
                                                                                onClick={() => setPage(number + 1)}
                                                                                className={`${page === number + 1
                                                                                          ? "btn btn-sm btn-primary"
                                                                                          : "btn btn-sm btn-outline btn-primary"
                                                                                          }`}
                                                                      >
                                                                                {number + 1}
                                                                      </button>
                                                            ))}

                                                            <button
                                                                      onClick={() => setPage(page + 1)}
                                                                      className={`btn btn-outline btn-sm ${page === totalPages ? "btn-disabled" : "btn-primary"}`}
                                                            >
                                                                      <BiRightArrow />
                                                            </button>
                                                  </div>
                                        </div>
                              ) : (
                                        <></>
                              )}
                    </>
          );
}
