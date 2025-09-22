import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/'>) {
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
