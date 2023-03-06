import React, { useContext, useState, useEffect } from 'react'
import URLBox from '../URLBox/URLBox';
import { toast } from 'react-hot-toast';
import { nanoid } from 'nanoid';
import auth from '../../auth/Firebase/firebase.init';
import { BASE_API } from '../../config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { InitializeContext } from '../../App';
import Swal from 'sweetalert2';
import { ClipLoader, ScaleLoader } from 'react-spinners';

export default function Home() {
          const { refetch } = useContext(InitializeContext);
          const [user] = useAuthState(auth);
          const [urlError, setUrlError] = useState<string>("");
          const [loading, setLoading] = useState<boolean>(false);
          const [localURLs, setLocalURLs] = useState<any>(JSON.parse(localStorage.getItem('localURLs') || '[]'));

          const isValidURL = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i;

          const handleURLError = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const input = e.target.value;
                    // check if input is empty
                    if (input === '') {
                              setUrlError('Please Enter URL..!');
                    } else if (!input.startsWith('https://') && !input.startsWith('http://')) {
                              setUrlError('Please add https or http before..!');
                    } else if (isValidURL.test(input)) {
                              setUrlError('');
                    } else {
                              setUrlError('Please Enter Valid URL..!');
                    }
          }

          const submitForm = async (e: React.SyntheticEvent) => {
                    e.preventDefault();
                    const form = e.target as typeof e.target & {
                              URL: { value: string };
                    };
                    const input = form.URL.value;
                    // create a new object with id, url and previous object
                    const postURLs = {
                              urls: {
                                        _id: nanoid(10),
                                        slug: nanoid(6),
                                        url: input,
                                        views: 0,
                                        createdAt: new Date().toDateString() + ' ' + new Date().toLocaleTimeString(),
                              }
                    };

                    if (input === '') {
                              toast.error('Please Enter URL to Shorten..!', {
                                        duration: 4000,
                                        style: {
                                                  padding: '1rem',
                                                  background: '#333',
                                                  color: '#fff',
                                        },
                              });
                              return;
                    } else if (input && !user) {
                              // set urls in local storage as an array
                              const urls = JSON.parse(localStorage.getItem('localURLs') || '[]');
                              // check if url already exists
                              const urlExists = urls.find((url: any) => url.url === input);
                              if (urlExists) {
                                        Swal.fire({
                                                  icon: 'error',
                                                  title: 'Already Exists!',
                                                  text: `URL: ${input}. Shorten: ${window.location.href}l/${urlExists.slug}. Please try another URL.`,
                                                  background: "#333",
                                                  color: "#fff",
                                                  confirmButtonText: 'Ok, Got it!',
                                        });
                                        form.URL.value = '';
                                        return;
                              } else {
                                        // add new object to local storage
                                        urls.push(postURLs.urls);
                                        localStorage.setItem('localURLs', JSON.stringify(urls));
                                        toast.success('URL Shortened Successfully..!', {
                                                  duration: 4000,
                                                  style: {
                                                            padding: '1rem',
                                                            background: '#333',
                                                            color: '#fff',
                                                  },
                                        });
                                        setLoading(false);
                                        form.URL.value = '';
                                        setLocalURLs(JSON.parse(localStorage.getItem('localURLs') || '[]'));
                                        return;
                              }
                    }
                    else {
                              const res = await fetch(`${BASE_API}/user/urls/dup/q`, {
                                        headers: {
                                                  'Content-Type': 'application/json',
                                                  authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                                        },
                                        method: 'POST',
                                        body: JSON.stringify({ url: input }),
                              });
                              const data = await res.json();
                              if (data?.url || data.length > 0) {
                                        Swal.fire({
                                                  icon: 'error',
                                                  title: 'Already Exists!',
                                                  text: `URL: ${input}. Shorten: ${window.location.href}k/${data?.slug}. Please try another URL.`,
                                                  background: "#333",
                                                  color: "#fff",
                                                  confirmButtonText: 'Ok, Got it!',
                                        });
                                        form.URL.value = '';
                                        return;
                              } else if (input === '' && user) {
                                        toast.error('Please Enter URL to Shorten..!', {
                                                  duration: 4000,
                                                  style: {
                                                            padding: '1rem',
                                                            background: '#333',
                                                            color: '#fff',
                                                  },
                                        });
                                        return;
                              } else if (!data && input !== '' && !urlError && !user) {
                                        Swal.fire({
                                                  icon: 'error',
                                                  title: 'Login Required!',
                                                  text: `Please Login to Shorten URL..!`,
                                                  background: "#333",
                                                  color: "#fff",
                                                  confirmButtonText: 'Ok, Got it!',
                                        });
                                        return;
                              } else {
                                        if (input !== '' && !urlError && user) {
                                                  setLoading(true);
                                                  const uid = localStorage.getItem('uid');
                                                  const res = await fetch(`${BASE_API}/user/urls?uid=${uid}`, {
                                                            method: 'POST',
                                                            headers: {
                                                                      'Content-Type': 'application/json',
                                                                      'authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                                                            },
                                                            body: JSON.stringify(postURLs)
                                                  });
                                                  const data = await res.json();
                                                  if (data.success) {
                                                            toast.success('URL Shortened Successfully..!', {
                                                                      duration: 4000,
                                                                      style: {
                                                                                padding: '1rem',
                                                                                background: '#333',
                                                                                color: '#fff',
                                                                      },
                                                            });
                                                            setLoading(false);
                                                            form.URL.value = '';
                                                            refetch();
                                                  } else {
                                                            toast.error('Something went wrong..!');
                                                            setLoading(false);
                                                  }
                                        } else if (!user || input !== '') {
                                                  Swal.fire({
                                                            icon: 'error',
                                                            title: 'Login Required!',
                                                            text: `Please Login to Shorten URL.`,
                                                            background: "#333",
                                                            color: "#fff",
                                                            confirmButtonText: 'Ok, Got it!',
                                                  });
                                        } else {
                                                  toast.error('Please Enter URL to Shorten..!', {
                                                            duration: 4000,
                                                            style: {
                                                                      padding: '1rem',
                                                                      background: '#333',
                                                                      color: '#fff',
                                                            },
                                                  });
                                        }
                              }

                    }
          }

          useEffect(() => {
                    setLocalURLs(JSON.parse(localStorage.getItem('localURLs') || '[]'));
          }, []);

          return (
                    <div className='mt-12 md:mt-24'>
                              <div className='text-center text-white flex flex-col gap-2 justify-center items-center'>
                                        <h1 className='text-2xl md:text-5xl font-bold'>Shorten your <span className='text-primary'>loooooong</span> URLs</h1>
                                        <h1 className='text-2xl md:text-5xl font-bold'>like never before!</h1>
                                        <p className='text-xs md:text-md'>Copy your long URL. Paste it below. Then 🎇 You got it, right?</p>
                              </div>
                              <div>
                                        <form onSubmit={submitForm}>
                                                  <div className="form-control w-full max-w-lg flex mx-auto mt-12">
                                                            <label className="label px-9 md:px-6">
                                                                      <span className="label-text text-white">Your Long URL</span>
                                                            </label>
                                                            <div className='flex flex-col md:flex-row justify-center items-center gap-3'>
                                                                      <input type="text" name='URL' placeholder="Type/Paste your URL" onChange={handleURLError} className={`input w-full max-w-xs bg-transparent border-1 border-white text-white lowercase ${urlError && "border-error shadow-error outline-error"}`} autoComplete='off' />
                                                                      <button className={`btn btn-primary text-white ${urlError ? 'btn-disabled cursor-not-allowed' : ''}`}>{loading ? <ClipLoader loading={loading}
                                                                                color="#fff"
                                                                                size={20}
                                                                      /> : "Shorten URL"}</button>
                                                            </div>
                                                            {urlError && (
                                                                      <small className="flex flex-col pt-2 text-error px-9 md:px-6">
                                                                                {urlError}
                                                                      </small>
                                                            )}
                                                            <p className='text-white text-center mt-3 text-xs'>React, Redux & Typescript powered URL Shortener 🔥</p>
                                                  </div>
                                        </form>
                              </div>

                              {
                                        loading ? (
                                                  <div className='flex flex-col justify-center items-center h-[30vh] md:h-[40vh]'>
                                                            <ScaleLoader color="#fff" />
                                                  </div>
                                        ) : (
                                                  <URLBox localURLs={localURLs} />
                                        )
                              }
                    </div>
          )
}
