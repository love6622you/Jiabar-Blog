"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineHome,
  AiOutlineInfoCircle,
  AiOutlineContacts,
  AiOutlineUser
} from "react-icons/ai";

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
  },
  {
    href: "/contact",
    name: "Contact",
    icon: <AiOutlineContacts className="h-6 w-6" />
  }
];

const SideBar = () => {
  return (
    <header className="sticky top-0 z-30 h-screen basis-24">
      <div className="flex h-full flex-col items-center justify-between py-10">
        <Link href={"/"} className="relative h-8 w-8">
          <Image
            alt="logo"
            src={"https://floatui.com/logo-letter.png"}
            fill
            className="object-cover"
            sizes="*"
          />
        </Link>

        <nav className="flex flex-col gap-y-5">
          {navigation.map((item, idx) => (
            <Link
              key={item.name}
              href={item.href}
              className="group relative flex w-fit items-center justify-center rounded-full p-2 text-gray-500 hover:bg-gray-100"
            >
              <div className="text-gray-500">{item.icon}</div>
              <span className="absolute left-14 hidden whitespace-nowrap rounded-lg bg-gray-100 px-2.5 py-1.5 text-xs text-gray-500 group-hover:inline-block">
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        <div className="p-2">
          <AiOutlineUser className="h-6 w-6" />
        </div>
      </div>
    </header>
  );
};

export default SideBar;
