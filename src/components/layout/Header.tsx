"use client";

import { useEffect, useRef, useState } from "react";
import { AiOutlineMenu, AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { useClickOutside } from "@/hook/useClickOutside";
import { UserInfoDropdownMenu } from "../UserInfoDropdownMenu";
import AuthModal from "../modal/AuthModal";
import NewPostModal from "../modal/NewPostModal";

type HeaderProps = {
  className?: string;
};

const Header = ({ className }: HeaderProps) => {
  const [hasToken, setHasToken] = useState(false);

  const [isNarbarOpen, setIsNarbarOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  useClickOutside(() => setIsNarbarOpen(false), null, [headerRef.current]);

  const navigation = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" }
  ];

  return (
    <header ref={headerRef} className={cn("bg-white md:text-sm", className)}>
      <nav className="mx-auto h-full max-w-[1400px] items-center gap-x-5 px-4 md:flex md:px-8">
        {/* Logo */}
        <div className="flex items-center justify-between">
          <Link href="/">
            <Image
              src="https://www.floatui.com/logo.svg"
              width={120}
              height={50}
              alt="JB logo"
            />
          </Link>

          <form className="ml-5 mr-auto flex items-center rounded-md border p-2.5">
            <AiOutlineSearch className="h-5 w-5 text-gray-300" />
            <Input
              className=" h-5 w-[200px] border-none focus-visible:ring-0"
              placeholder="Search..."
            />
          </form>

          {/* mobile */}
          <div className="md:hidden">
            <button
              className=" align-middle text-gray-500 hover:text-gray-800"
              onClick={() => setIsNarbarOpen(!isNarbarOpen)}
            >
              {isNarbarOpen ? (
                <AiOutlineClose className="h-6 w-6" />
              ) : (
                <AiOutlineMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div
          className={cn(
            "mt-8 md:mt-0 md:flex md:flex-1 md:items-center",
            isNarbarOpen ? "block" : "hidden"
          )}
        >
          <ul className="space-y-6 md:hidden">
            {navigation.map((item, idx) => {
              return (
                <li key={idx} className="text--700 hover:text-gray-900">
                  <Link href={item.path}>{item.title}</Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 flex-1 items-center justify-end gap-x-6 space-y-6 md:mt-0 md:flex md:space-y-0">
            {hasToken ? (
              <>
                <NewPostModal />
                <UserInfoDropdownMenu />
              </>
            ) : (
              <AuthModal />
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
