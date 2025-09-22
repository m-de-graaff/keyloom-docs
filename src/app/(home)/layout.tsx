import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import {
  NavbarMenu,
  NavbarMenuContent,
  NavbarMenuLink,
  NavbarMenuTrigger,
} from 'fumadocs-ui/layouts/home/navbar';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <HomeLayout
      {...baseOptions()}
      links={[
        {
          type: 'custom',
          // only displayed on navbar, not mobile menu
          on: 'nav',
          children: (
            <NavbarMenu>
              <NavbarMenuTrigger>Documentation</NavbarMenuTrigger>
              <NavbarMenuContent>
                <NavbarMenuLink href="/docs/getting-started">Getting Started</NavbarMenuLink>
                <NavbarMenuLink href="/docs/components">Components</NavbarMenuLink>
                <NavbarMenuLink href="/docs/openapi">OpenAPI</NavbarMenuLink>
              </NavbarMenuContent>
            </NavbarMenu>
          ),
        },
        { text: 'Showcase', url: '/showcase', active: 'nested-url' },
        { text: 'Sponsors', url: '/sponsors', active: 'nested-url' },
      ]}
    >
      {children}
    </HomeLayout>
  );
}
