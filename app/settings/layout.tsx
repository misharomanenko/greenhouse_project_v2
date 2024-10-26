import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings | KP Fellows',
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
