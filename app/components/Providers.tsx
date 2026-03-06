"use client";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./ThemeProvider";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Providers(props: Props) {
  return (
    <SessionProvider>
      <ThemeProvider>{props.children}</ThemeProvider>
    </SessionProvider>
  );
}
