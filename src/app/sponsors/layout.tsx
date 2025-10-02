import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      {...baseOptions()}
      links={[
        { text: 'Documentation', url: '/docs', active: 'nested-url' },
        { text: 'Showcase', url: '/showcase', active: 'nested-url' },
        { text: 'Sponsors', url: '/sponsors', active: 'nested-url' },
      ]}
    >
      {children}
    </HomeLayout>
  );
}