import React from 'react';
import { Job } from '@/data/types';
import { useUser } from '@auth0/nextjs-auth0/client';
import axios from 'axios';
import { useForm } from 'react-hook-form';

interface JobForm {
  handleClose: () => void;
  fetchData: () => void;
}

export const JobForm: React.FC<JobForm> = ({ handleClose, fetchData }) => {
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Job>();

  const submit = async (formData: Job) => {
    try {
      if (!user?.sub) throw new Error('User not authenticated');

      await axios.post(`/api/jobs/${user.sub}`, formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      reset();
      fetchData();
      handleClose();
    } catch (error) {
      console.error('Error submitting job:', error);
    }
  };

  if (!user) return null;

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-12">
      {/* Job Position Field */}
      <div className="sm:col-span-4">
        <label
          htmlFor="jobPosition"
          className="block text-sm font-medium text-white"
        >
          Job Position
        </label>
        <div className="mt-2">
          <input
            id="jobPosition"
            {...register('jobPosition', {
              required: 'Job Position is required',
            })}
            type="text"
            placeholder="Job Position"
            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white placeholder:text-gray-500 focus:outline focus:outline-indigo-500"
          />
          {errors.jobPosition && (
            <p className="text-sm text-red-500">{errors.jobPosition.message}</p>
          )}
        </div>
      </div>

      {/* Company Field */}
      <div className="sm:col-span-3">
        <label
          htmlFor="company"
          className="block text-sm font-medium text-white"
        >
          Company
        </label>
        <div className="mt-2">
          <input
            id="company"
            {...register('company', { required: 'Company is required' })}
            type="text"
            placeholder="Company"
            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white placeholder:text-gray-500 focus:outline focus:outline-indigo-500"
          />
          {errors.company && (
            <p className="text-sm text-red-500">{errors.company.message}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-indigo-500 px-3 py-2 text-right text-sm font-semibold text-white hover:bg-indigo-400 focus:outline focus:outline-2 focus:outline-indigo-500"
        >
          Save
        </button>
      </div>
    </form>
  );
};
