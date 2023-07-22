"use client";

import { useRef, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { cn } from "@/lib/utils";
import { useClickOutside } from "@/hook/useClickOutside";
import { UserInfoDropdownMenu } from "../UserInfoDropdownMenu";
import AuthModal from "../modal/AuthModal";
import NewPostModal from "../modal/NewPostModal";
import { useRouter } from "next/navigation";
import SearchBar from "../search/SearchBar";

type HeaderProps = {
  className?: string;
};

const navigation = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" }
];

const Header = ({ className }: HeaderProps) => {
  const headerRef = useRef<HTMLElement>(null);
  const { status } = useSession();
  const router = useRouter();

  const [isNarbarOpen, setIsNarbarOpen] = useState(false);

  const handleSearch = (searchText: string) => {
    router.push(`/search?query=${searchText}`);
  };

  const handleNavigation = (url: string) => {
    router.push(url);
  };

  // Todo: optimize
  useClickOutside(() => setIsNarbarOpen(false), undefined, [headerRef.current]);

  return (
    <header ref={headerRef} className={cn("bg-white text-sm", className)}>
      <nav className="mx-auto max-w-[1400px] items-center px-4 md:flex md:px-8">
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

          <SearchBar onSearch={handleSearch} />

          {/* mobile */}
          <div className="md:hidden">
            <button
              className="align-middle text-gray-500 hover:text-gray-800"
              onClick={() => setIsNarbarOpen(!isNarbarOpen)}
            >
              {isNarbarOpen ? (
                <AiOutlineClose className="h-5 w-5" />
              ) : (
                <AiOutlineMenu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <div
          className={cn(
            "py-5 md:flex md:flex-1 md:items-center md:py-0",
            isNarbarOpen ? "block" : "hidden"
          )}
        >
          {/* Show on mobile */}
          <ul className="md:hidden">
            {navigation.map((item, idx) => {
              return (
                <li
                  key={idx}
                  className="pb-5 text-gray-700 hover:text-gray-900"
                  onClick={() => {
                    handleNavigation(item.path);
                  }}
                >
                  {/* <Link href={item.path} className="inline-block w-full"> */}
                  {item.title}
                  {/* </Link> */}
                </li>
              );
            })}
          </ul>

          <div className="md:flex md:flex-1 md:items-center md:justify-end md:gap-x-6 ">
            {status === "authenticated" ? (
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
