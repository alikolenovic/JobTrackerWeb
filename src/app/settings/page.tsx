import { Button } from '@/components/button';
import { Checkbox, CheckboxField } from '@/components/checkbox';
import { Divider } from '@/components/divider';
import { Label } from '@/components/fieldset';
import { Form } from '@/components/form';
import { Heading, Subheading } from '@/components/heading';
import { Input } from '@/components/input';
import { Select } from '@/components/select';
import { Text } from '@/components/text';
import { Textarea } from '@/components/textarea';
import type { Metadata } from 'next';
import { Address } from './address';

export const metadata: Metadata = {
  title: 'Settings',
};

export default function Settings() {
  return <Form />;
}
