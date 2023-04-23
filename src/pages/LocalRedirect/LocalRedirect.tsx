import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './LocalRedirect.module.css'
import ErrorLink from '../../shared/ErrorLink/ErrorLink';

export default function LocalRedirect() {
          const { slug } = useParams();
          const [loading, setLoading] = useState<boolean>(true);

          useEffect(() => {
                    const fetchLocalURLs = () => {
                              const localUrls = JSON.parse(localStorage.getItem("localURLs") || "[]");
                              if (localUrls?.length === 0) return setLoading(false);
                              const urlObj = localUrls.find((url: any) => url.slug === slug);
                              if (!urlObj) return setLoading(false);
                              if (urlObj) {
                                        const url = urlObj.url;
                                        window.location.href = url;

                                        const views = urlObj.views + 1;
                                        const newLocalUrls = localUrls.map((url: any) => {
                                                  if (url.slug === slug) {
                                                            return {
                                                                      ...url,
                                                                      views,
                                                            }
                                                  } else {
                                                            return url;
                                                  }
                                        });

                                        localStorage.setItem("localURLs", JSON.stringify(newLocalUrls));
                              }
                    }

                    fetchLocalURLs();
          }, [slug, setLoading, loading]);

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