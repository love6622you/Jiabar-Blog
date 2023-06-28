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

const Header = () => {
  return (
    <header className="sticky top-0 h-screen basis-40">
      <div className="ml-auto flex h-full w-20 flex-col items-center justify-between py-10">
        <div className="relative h-8 w-8">
          <Image alt="logo" src={"https://floatui.com/logo-letter.png"} fill />
        </div>

        <nav className="flex flex-col gap-y-10">
          {navigation.map((item, idx) => (
            <Link
              key={item.name}
              href={item.href}
              className="group relative flex w-fit items-center justify-center rounded-full p-2 text-gray-700 hover:bg-gray-200"
            >
              <div className="text-gray-700">{item.icon}</div>
              <span className="absolute left-12 hidden whitespace-nowrap rounded-lg bg-gray-100 px-2.5 py-1.5 text-xs text-gray-700 group-hover:inline-block">
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

export default Header;
