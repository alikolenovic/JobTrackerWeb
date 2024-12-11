'use client';
import { useEffect, useState } from 'react';
import { Job } from '@/data/types';
import { UserContext, useUser } from '@auth0/nextjs-auth0/client';
import axios, { AxiosResponse } from 'axios';
import { IFuseOptions } from 'fuse.js';
import { Heading, Subheading } from './heading';
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
  const [data, setData] = useState<any[] | null>(null);
  const [searchResults, setSearchResults] = useState<any>([]);
  const { user }: UserContext = useUser();

  const options: IFuseOptions<any> = {
    keys: ['jobPosition', 'company'],
    includeScore: true,
    includeMatches: true,
    threshold: 0.2,
  };

  useEffect(() => {
    if (user) {
      axios
        .get(`/api/jobs/${user.sub}`)
        .then((response: AxiosResponse) => {
          setData(response.data.data);
          setSearchResults(response.data.data);
        })
        .catch((err) => console.error(err));
    }
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
            <TableHeader className="text-right">Date Applied</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchResults.map((job: Job) => (
            <TableRow key={job.jobId} title={job.jobPosition}>
              <TableCell>{job.jobId}</TableCell>
              <TableCell className="text-zinc-500">{job.jobPosition}</TableCell>
              <TableCell>{job.company}</TableCell>
              <TableCell className="text-right">
                {new Date(job.createdAt).toLocaleString('en-us', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default JobTable;
