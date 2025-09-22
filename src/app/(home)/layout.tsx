import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { NavbarMenu, NavbarMenuContent, NavbarMenuTrigger } from 'fumadocs-ui/layouts/home/navbar';

export default function Layout({ children }: LayoutProps<'/'>) {
  return <HomeLayout {...baseOptions()}
    links={[
      {
        type: 'custom',
        on: 'nav',
        children: (
          <NavbarMenu>
            <NavbarMenuTrigger>Documentation</NavbarMenuTrigger>
            <NavbarMenuContent>
              
            </NavbarMenuContent>
          </NavbarMenu>
        )
      }
    ]}
    >{children}</HomeLayout>;
}
