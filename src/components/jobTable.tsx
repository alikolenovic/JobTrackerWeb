'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext/AuthContext';
import { gql, useQuery } from '@apollo/client';
import axios from 'axios';
import Avatar from 'react-initials-avatar';
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from './table';

const GET_JOBS = gql`
  query {
    jobs {
      jobs {
        company
        dateApplied
        id
        title
      }
      isCacheHit
    }
  }
`;

const JobTable = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8081/jobs')
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  if (data === null) {
    return <></>;
  }

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
