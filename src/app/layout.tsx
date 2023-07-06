import "@/styles/globals.css";
import { Providers } from "@/components/providers";
import SideBar from "@/components/layout/SideBar";
import Aside from "@/components/layout/Aside";
import Header from "@/components/layout/Header";

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
          <Header />
          <div className="mx-auto flex max-w-[1400px]">
            <SideBar />
            <main className="flex-1 border-l-2 border-r-2">{children}</main>
            <Aside />
          </div>
        </Providers>
      </body>
    </html>
  );
}
