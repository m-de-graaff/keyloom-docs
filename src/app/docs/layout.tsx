import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
import { Banner } from '@/components/banner';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout tree={source.pageTree} {...baseOptions()}>
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
