import SideNav from '@/app/ui/sidenav';
import { roboto } from '@/app/ui/fonts';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-36">
        <SideNav />
      </div>
      <div
        className={`${roboto.className} antialiased flex-grow p-6 md:overflow-y-auto md:p-12 bg-zinc-800`}
      >
        {children}
      </div>
    </div>
  );
}
