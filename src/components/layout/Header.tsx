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
  { title: "About", path: "/about" }
  // { title: "Contact", path: "/contact" }
];

const Header = ({ className }: HeaderProps) => {
  const headerRef = useRef<HTMLElement>(null);
  const { status } = useSession();
  const router = useRouter();

  const [openNewPostModal, setOpenNewPostModal] = useState(false);
  const [isNarbarOpen, setIsNarbarOpen] = useState(false);

  const handleSearch = (searchText: string) => {
    router.push(`/search?query=${searchText}`);
  };

  const handleNavigation = (url: string) => {
    router.push(url);
    setIsNarbarOpen(false);
  };

  // Todo: optimize
  useClickOutside(() => setIsNarbarOpen(false), undefined, [headerRef.current]);

  return (
    <header ref={headerRef} className={cn("bg-white text-sm", className)}>
      <nav className="mx-auto flex h-[50px] max-w-[1400px]  items-center justify-between gap-x-4 px-4 md:h-[70px] md:px-8">
        {/* hamberger => mobile: show | other: hidden */}
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

        {/* Logo => mobile: center | other: left  */}
        <div className="flex items-center gap-x-2">
          <Link href="/">
            {/* <Image
              src="https://www.floatui.com/logo.svg"
              width={120}
              height={50}
              alt="JB logo"
            /> */}
            <p className="font-bold text-purple-700">Jiabar Blog</p>
          </Link>

          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Actions => mobile: show | other: show */}
        <div className="flex items-center justify-end gap-x-6 ">
          {status === "authenticated" ? (
            <>
              <div className="hidden md:block">
                <NewPostModal
                  open={openNewPostModal}
                  setOpen={setOpenNewPostModal}
                />
              </div>
              <UserInfoDropdownMenu
                openNewPostModal={() => setOpenNewPostModal(true)}
              />
            </>
          ) : (
            <AuthModal />
          )}
        </div>
      </nav>

      {/* Navigation List => mobile: show (when opening) | other: hidden */}
      {isNarbarOpen && (
        <ul className="space-y-6 p-4">
          {navigation.map((item, idx) => {
            return (
              <li
                key={idx}
                className="cursor-pointer text-gray-700 hover:text-gray-900"
                onClick={() => {
                  handleNavigation(item.path);
                }}
              >
                {item.title}
              </li>
            );
          })}
        </ul>
      )}
    </header>
  );
};

export default Header;
