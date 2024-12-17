'use client';
import { useEffect, useState } from 'react';
import { Job } from '@/data/types';
import { UserContext, useUser } from '@auth0/nextjs-auth0/client';
import { TrashIcon } from '@heroicons/react/20/solid';
import axios, { AxiosResponse } from 'axios';
import { IFuseOptions } from 'fuse.js';
import { Button } from './button';
import { Dialog } from './dialog';
import { Heading, Subheading } from './heading';
import { JobForm } from './JobForm';
import Search from './search';
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from './table';

const JobTable = () => {
  const [data, setData] = useState<Job[] | null>(null);
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<Job[] | null>([]);
  const { user }: UserContext = useUser();

  const handleClose = () => {
    setOpen(false);
  };

  const options: IFuseOptions<any> = {
    keys: ['jobPosition', 'company'],
    includeScore: true,
    includeMatches: true,
    threshold: 0.2,
  };

  const fetchData = () => {
    if (user) {
      axios
        .get(`/api/jobs/${user.sub}`)
        .then((response: AxiosResponse) => {
          setData(response.data.data as Job[]);
          setSearchResults(response.data.data as Job[]);
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  if (data === null) {
    return <></>;
  }

  if (user === undefined) {
    return <></>;
  }

  return (
    <>
      <Heading className="mb-14 mt-20">Welcome, {user.name}</Heading>
      <div className="flex justify-end">
        <Button onClick={() => setOpen(true)}>Create +</Button>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <JobForm handleClose={handleClose} fetchData={fetchData} />
      </Dialog>
      <div className="flex items-center justify-between object-center">
        <Subheading className="">Recent Jobs</Subheading>
        <Search
          initialData={data}
          options={options}
          setResultsChange={setSearchResults}
        />
      </div>
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Job ID</TableHeader>
            <TableHeader>Job Title</TableHeader>
            <TableHeader>Company</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader className="text-right">Date Applied</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchResults &&
            searchResults.map((job: Job) => (
              <TableRow key={job.jobId} title={job.jobPosition}>
                <TableCell>{job.jobId}</TableCell>
                <TableCell className="text-zinc-500">
                  {job.jobPosition}
                </TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell>{job.status}</TableCell>
                <TableCell className="text-right">
                  {new Date(job.createdAt).toLocaleString('en-us', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={async () => {
                      await axios.delete(`api/jobs/${job.jobId}`);
                      fetchData();
                    }}
                  >
                    <TrashIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default JobTable;
