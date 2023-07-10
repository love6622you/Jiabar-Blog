import "@/styles/globals.css";
import { Providers } from "@/components/providers";
import SideBar from "@/components/layout/SideBar";
import Aside from "@/components/layout/Aside";
import Header from "@/components/layout/Header";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen overflow-y-scroll bg-gray-100">
        <Providers>
          <Header className="fixed z-50 max-h-max w-full py-2 md:h-full md:max-h-[80px]" />
          <div className="mx-auto flex max-w-[1400px] pt-[80px]">
            <SideBar />
            <main className="flex-1 border-l-2 border-r-2">{children}</main>
            <Aside />
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
