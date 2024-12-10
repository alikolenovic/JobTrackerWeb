'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import axios from 'axios';
import { Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from './table';

const JobTable = () => {
  const [data, setData] = useState(null);
  const { user } = useUser();

  console.log(user);

  useEffect(() => {
    axios
      .get(`/api/jobs/${user.sid}`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((err) => console.error(err));
  }, [user]);

  if (data === null) {
    return <></>;
  }
  console.log(data);

  return (
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
        {data.map((job) => (
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
  );
};

export default JobTable;
