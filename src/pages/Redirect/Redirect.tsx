import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './Redirect.module.css'
import ErrorLink from '../../shared/ErrorLink/ErrorLink';
import { BASE_API } from '../../config';

export default function Redirect() {
          const { slug } = useParams();
          const [loading, setLoading] = useState<boolean>(true);

          useEffect(() => {
                    const fetchLinkDoc = () => {
                              const uid = localStorage.getItem("uid");
                              if (!slug || slug.length !== 6 || uid === undefined) return setLoading(false);
                              axios.get(`${BASE_API}/users/urls?slug=${slug}`, {
                                        headers: {
                                                  authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                                        },
                              }).then(data => {
                                        if (data.data) {
                                                  const urlObj = data.data.url;
                                                  if (!urlObj) return setLoading(false);
                                                  window.location.href = urlObj;
                                        }
                              }).catch(err => {
                                        setLoading(false);
                                        console.log(err);
                              })
                    }

                    fetchLinkDoc();
          }, [slug, setLoading]);

          if (loading) {
                    return (
                              <div className={styles.preloader}>
                                        <div className={styles.body}>
                                                  <span>
                                                            <span></span>
                                                            <span></span>
                                                            <span></span>
                                                            <span></span>
                                                  </span>
                                                  <div className={styles.base}>
                                                            <span></span>
                                                            <div className={styles.face}></div>
                                                  </div>
                                        </div>
                                        <div className={styles.longfazers}>
                                                  <span></span>
                                                  <span></span>
                                                  <span></span>
                                                  <span></span>
                                        </div>
                                        <h1>Redirecting...</h1>

                              </div>
                    )
          } else {
                    return (
                              <ErrorLink />
                    )
          }
}