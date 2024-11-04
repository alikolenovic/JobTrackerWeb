// src/app/dashboard/page.js
'use client';

import { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { useRouter } from 'next/navigation';

const GET_JOBS = gql`
  query GetJobs {
    jobs {
      id
      title
      company
      dateApplied
    }
  }
`;

export default function DashboardPage() {
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts } = useMsal();
  const { loading, error, data } = useQuery(GET_JOBS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const username = accounts[0] && accounts[0].username;

  return (
    <ul>
      {data.jobs.map((job) => (
        <li key={job.id}>
          {job.title} at {job.company} (Applied on {job.dateApplied})
        </li>
      ))}
    </ul>
  );
}
