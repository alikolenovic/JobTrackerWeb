import { Badge } from '@/components/badge';
import { Divider } from '@/components/divider';
import { Form } from '@/components/form';
import { Subheading } from '@/components/heading';
import JobTable from '@/components/jobTable';

export function Stat({ title, value, change }: { title: string; value: string; change: string }) {
  return (
    <div>
      <Divider />
      <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">{title}</div>
      <div className="mt-3 text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
      <div className="mt-3 text-sm/6 sm:text-xs/6">
        <Badge color={change.startsWith('+') ? 'lime' : 'pink'}>{change}</Badge>{' '}
        <span className="text-zinc-500">from last week</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Subheading className="mt-14">Recent Jobs</Subheading>
      <JobTable />
      <Form />
    </>
  );
}
