import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
import { Banner } from '@/components/banner';
import { GithubInfo } from '@/components/github-info';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout tree={source.pageTree} {...baseOptions()} links={[
      {
        type: 'custom',
        children: (
          <GithubInfo owner="m-de-graaff" repo="keyloom" className='lg:-mx-2' />
        )
      }
    ]}>
          <Banner
            variant="rainbow"
            rainbowColors={[
              'rgba(0, 255, 221, 0.5)',
              'rgba(0, 255, 221, 0.5)',
              'transparent',
              'rgba(0, 255, 221, 0.5)',
              'transparent',
              'rgba(0, 255, 221, 0.5)',
              'transparent',
            ]}
          >
            Keyloom Auth is currently in beta. Feedback and contributions are welcome!
          </Banner>
      {children}
    </DocsLayout>
  );
}
