import { Job } from '@/data/types';
import { getAccessToken } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query; // Get the `id` parameter from the query

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing id parameter' });
  }
  const { accessToken } = await getAccessToken(req, res);
  const encodedUserId = encodeURIComponent(id);

  if (req.method === 'GET') {
    // Handle GET request
    try {
      if (process.env.GO_SERVER) {
        const fetchResponse = await fetch(
          `${process.env.GO_SERVER}/jobs/user/${encodedUserId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (!fetchResponse.ok) {
          return res
            .status(fetchResponse.status)
            .json({ error: 'Failed to fetch data' });
        }

        const data = await fetchResponse.json();
        return res.status(200).json({ data });
      }

      return res.status(500).json({ error: 'No environment config found' });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  if (req.method === 'POST') {
    // Handle POST request
    try {
      const data: Job = req.body;
      data.userId = id;

      if (process.env.GO_SERVER) {
        const fetchResponse = await fetch(`${process.env.GO_SERVER}/jobs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!fetchResponse.ok) {
          return res
            .status(fetchResponse.status)
            .json({ error: 'Failed to add job' });
        }

        return res.status(200).json({ message: 'Added job' });
      }

      return res.status(500).json({ error: 'No environment config found' });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  // Method not allowed
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
};

export default handler;
