import "@/styles/globals.css";
import { Providers } from "@/components/providers";
import SideBar from "@/components/layout/SideBar";
import Aside from "@/components/layout/Aside";
import Header from "@/components/layout/Header";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Jiabar Blog",
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
      <body className="min-h-screen overflow-y-scroll bg-gray-100 md:pt-[60px]">
        <Providers>
          <Header className="fixed left-0 top-0 z-50 w-full md:max-h-[60px]" />
          <div className="mx-auto flex max-w-[1400px] gap-x-5 py-20 md:py-10">
            <SideBar
              className={`${styles.barSticky} w-20 pl-5 max-md:hidden`}
            />
            <main className="flex-[1] rounded-2xl bg-white">{children}</main>
            <Aside className={`${styles.barSticky} w-80 max-lg:hidden`} />
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
