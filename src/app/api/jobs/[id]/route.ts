import { getAccessToken } from '@auth0/nextjs-auth0';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const { accessToken } = await getAccessToken();

  // Example response
  if (process.env.GO_SERVER) {
    const res = await fetch(`${process.env.GO_SERVER}/jobs/user/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch data' }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json({ data });
  }

  return NextResponse.json({ error: 'No environment config found' }, { status: 500 });
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;

  // Process the POST request body
  const data = await req.json();
  data.userId = parseInt(id);

  if (process.env.GO_SERVER) {
    const res = await fetch(`${process.env.GO_SERVER}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to add job' }, { status: res.status });
    }

    return NextResponse.json({ message: 'Added job' }, { status: 200 });
  }
  return NextResponse.json({ error: 'No environment config found' }, { status: 500 });
}
