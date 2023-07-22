"use client";

import React from "react";
import { signIn } from "next-auth/react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog";
import {
  AiOutlineRight,
  AiOutlineGithub,
  AiOutlineGoogle
} from "react-icons/ai";
import { LucideLoader2 } from "lucide-react";

const AuthModal = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const authButtons = [
    {
      key: "github",
      label: "Github",
      icons: <AiOutlineGithub className="mr-2 h-4 w-4" />,
      onClick: () => {}
    },
    {
      key: "google",
      label: "Google",
      icons: <AiOutlineGoogle className="mr-2 h-4 w-4" />,
      onClick: () => {}
    }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full gap-x-1 rounded-lg md:w-auto" size={"sm"}>
          Log in
          <AiOutlineRight className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="md:max-w-[480px]">
        <DialogHeader className="">
          <DialogTitle className="text-center">Welcome Back</DialogTitle>
        </DialogHeader>

        <DialogDescription></DialogDescription>

        <div className="flex flex-col gap-3">
          {authButtons.map((btn) => {
            return (
              <Button
                key={btn.label}
                className="text-base"
                variant={"outline"}
                onClick={() => {
                  setIsLoading(true);
                  signIn(btn.key, {
                    callbackUrl: "/"
                  });
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  btn.icons
                )}
                {btn.label}
              </Button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
