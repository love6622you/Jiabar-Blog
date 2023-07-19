import "@/styles/globals.css";
import { Providers } from "@/components/providers";
import SideBar from "@/components/layout/SideBar";
import Aside from "@/components/layout/Aside";
import Header from "@/components/layout/Header";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Jiabar Blogger",
  description: "Jiabar 部落格是一個可以讓你隨心記錄的發文平台"
};

const styles = {
  barSticky: "sticky top-10 z-30 h-[calc(100vh_-_80px)]"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen overflow-y-scroll bg-gray-100 pt-[80px]">
        <Providers>
          <Header className="fixed inset-0 z-50 max-h-max w-full py-2 md:max-h-[80px]" />
          <div className="mx-auto flex max-w-[1400px] gap-x-5 py-10">
            <SideBar className={`${styles.barSticky} basis-24`} />
            <main className="flex-1 rounded-2xl bg-white">{children}</main>
            <Aside className={`${styles.barSticky} basis-[22.5rem]`} />
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
