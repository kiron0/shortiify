import React, { useContext, useState } from 'react'
import URLBox from '../URLBox/URLBox';
import { toast } from 'react-hot-toast';
import { nanoid } from 'nanoid';
import auth from '../../auth/Firebase/firebase.init';
import { BASE_API } from '../../config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { InitializeContext } from '../../App';
import Loading from '../../components/Loading/Loading';

export default function Home() {
          const { refetch } = useContext(InitializeContext);
          const [user] = useAuthState(auth);
          const [urlError, setUrlError] = useState<string>("");
          const [loading, setLoading] = useState<boolean>(false);

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
                                        slug: nanoid(6),
                                        url: input,
                                        createdAt: new Date().toDateString() + ' ' + new Date().toLocaleTimeString(),
                              }
                    };

                    // console.log(postURLs);
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
                                        toast.success('Shortened Successfully..!');
                                        setLoading(false);
                                        form.URL.value = '';
                                        refetch();
                              } else {
                                        toast.error('Something went wrong..!');
                                        setLoading(false);
                              }
                    } else if (!user) {
                              toast.error('Please Login to Shorten URL..!');
                    } else {
                              toast.error('Please Enter URL..!');
                    }
          }

          if (loading) return (
                    <Loading />
          )

          return (
                    <div className='mt-12 md:mt-24'>
                              <div className='text-center text-white flex flex-col gap-2 justify-center items-center'>
                                        <h1 className='text-2xl md:text-5xl'>Shorten your <span className='text-secondary'>loooooong</span> URLs</h1>
                                        <h1 className='text-2xl md:text-5xl'>like never before!</h1>
                                        <p className='text-sm md:text-md'>Copy your long URL. Paste it below. Then You got it, right?</p>
                              </div>

                              <div>
                                        <form onSubmit={submitForm}>
                                                  <div className="form-control w-full max-w-lg flex mx-auto mt-12">
                                                            <label className="label px-9 md:px-6">
                                                                      <span className="label-text text-white">Your Long URL</span>
                                                            </label>
                                                            <div className='flex flex-col md:flex-row justify-center items-center gap-3'>
                                                                      <input type="text" name='URL' placeholder="Type/Paste your URL" onChange={handleURLError} className={`input w-full max-w-xs bg-transparent border-1 border-white text-white ${urlError && "border-error shadow-error outline-error"}`} autoComplete='off' />
                                                                      <button className={`btn ${urlError ? 'btn-disabled cursor-not-allowed' : ''}`}>Shorten URL</button>
                                                            </div>
                                                            {urlError && (
                                                                      <small className="flex flex-col pt-2 text-error px-9 md:px-6">
                                                                                {urlError}
                                                                      </small>
                                                            )}
                                                            <p className='text-white text-center mt-3 text-xs'>React, Redux & Typescript powered URL Shortener</p>
                                                  </div>
                                        </form>
                              </div>

                              <URLBox />
                    </div>
          )
}
