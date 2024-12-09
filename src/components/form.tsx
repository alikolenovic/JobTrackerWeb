'use client';

import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import Image from 'next/image';
import { useForm } from 'react-hook-form';

const user = {
  userId: 1,
  username: 'rwilloughby6',
  email: 'rwilloughby6@delicious.com',
  firstName: 'Redford',
  lastName: 'Willoughby',
  role: 'user',
  createdAt: '2024-12-06 17:43:06.9128756 +0000 UTC',
  updatedAt: '2024-12-06 17:43:06.9128756 +0000 UTC',
  lastLogin: '2024-12-06 17:43:06.9128756 +0000 UTC',
};

interface UserI {
  userId: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
}
export const Form = () => {
  const submit = async (formData) => {
    console.log(formData);
    const data = new FormData();
    data.append('userId', formData.userId);
    data.append('file', formData.file[0]);
    await axios.post('http://localhost:8083/', data, {
      headers: {
        'content-type': `multipart/form-data; boundary=${data._boundary}`,
      },
    });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserI & { file?: File }>({ defaultValues: user });
  return (
    <form onSubmit={handleSubmit(submit)} encType="multipart/form-data">
      <div className="space-y-12">
        <div className="border-b border-white/10 pb-12">
          <h2 className="text-base/7 font-semibold text-white">Profile</h2>
          <p className="mt-1 text-sm/6 text-gray-400">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-white"
              >
                Username
              </label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white/5 pl-3 outline outline-1 -outline-offset-1 outline-white/10 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                  <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
                    jobtracker.com/
                  </div>
                  <input
                    id="username"
                    {...register('username')}
                    name="username"
                    type="text"
                    placeholder="janesmith"
                    className="block min-w-0 grow bg-transparent py-1.5 pl-1 pr-3 text-base text-white placeholder:text-gray-500 focus:outline focus:outline-0 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            {/* <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm/6 font-medium text-white"
              >
                About
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-400">
                Write a few sentences about yourself.
              </p>
            </div> */}

            <div className="col-span-full">
              <label
                htmlFor="file"
                className="block text-sm/6 font-medium text-white"
              >
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <Image
                  src={`http://localhost:8083/images/${user.userId}`}
                  width={200}
                  height={200}
                  className="h-12 w-12 rounded-full"
                  alt=""
                />
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  {...register('file')}
                  className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                ></input>
              </div>
            </div>

            {/* <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm/6 font-medium text-white"
              >
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    aria-hidden="true"
                    className="mx-auto size-12 text-gray-500"
                  />
                  <div className="mt-4 flex text-sm/6 text-gray-400">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-gray-900 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 text-gray-400">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        <div className="border-b border-white/10 pb-12">
          <h2 className="text-base/7 font-semibold text-white">
            Personal Information
          </h2>
          <p className="mt-1 text-sm/6 text-gray-400">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm/6 font-medium text-white"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  id="first-name"
                  {...register('firstName')}
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm/6 font-medium text-white"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  id="last-name"
                  {...register('lastName')}
                  name="last-name"
                  type="text"
                  autoComplete="family-name"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register('email')}
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm/6 font-semibold text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
