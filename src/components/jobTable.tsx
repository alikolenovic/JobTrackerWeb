'use client';

import { useAuth } from '@/context/AuthContext/AuthContext';
import { gql, useQuery } from '@apollo/client';
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
  const { userInfo } = useAuth();
  const { data, loading, error } = useQuery(GET_JOBS);

  console.log(userInfo);

  if (loading) return <></>;
  if (error) return <p>Error: {error.message}</p>;

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
        {data.jobs.jobs.map((job) => (
          <TableRow key={job.id} title={job.title}>
            <TableCell>{job.id}</TableCell>
            <TableCell className="text-zinc-500">{job.title}</TableCell>
            <TableCell>{job.company}</TableCell>
            <TableCell className="text-right">
              {new Date(job.dateApplied).toLocaleString('en-us', {
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
