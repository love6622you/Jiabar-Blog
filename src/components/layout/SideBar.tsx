"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { AiOutlineHome, AiOutlineInfoCircle } from "react-icons/ai";

const navigation = [
  {
    href: "/",
    name: "Home",
    icon: <AiOutlineHome className="h-6 w-6" />
  },
  {
    href: "/about",
    name: "About",
    icon: <AiOutlineInfoCircle className="h-6 w-6" />
  }
  // {
  //   href: "/contact",
  //   name: "Contact",
  //   icon: <AiOutlineContacts className="h-6 w-6" />
  // }
];

type SideBarType = {
  className?: string;
};

const SideBar = ({ className }: SideBarType) => {
  return (
    <nav className={cn(className)}>
      <div className="flex h-full flex-col items-end justify-center py-10">
        <nav className="flex flex-col gap-y-5">
          {navigation.map((item, idx) => (
            <Link
              key={item.name}
              href={item.href}
              className="group relative flex w-fit items-center justify-center rounded-full p-2 text-gray-500 hover:bg-purple-200"
            >
              <div className="text-gray-500 group-hover:text-gray-100">{item.icon}</div>
              <span className="absolute left-14 hidden whitespace-nowrap rounded-lg bg-purple-200 px-2.5 py-1.5 text-xs font-bold text-white group-hover:inline-block">
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </nav>
  );
};

export default SideBar;
