import React from 'react'
import styles from './Preloader.module.css';

export default function Preloader() {
          const text = "</KiroN>";
          return (
                    <section className={styles.preloader}>
                              <div className={styles.box_section}>
                                        <div className={styles.image_box}>
                                                  <h1 className={styles.loader_text}>{text}</h1>
                                        </div>
                                        <div className={styles.img_filter}></div>
                              </div>
                    </section>
          )
}
