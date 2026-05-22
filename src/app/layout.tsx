import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import ClientProvider from "./ClientProvider"; // ✅ only this import
import Header from "@/src/components/Header"; // ✅ only this import

export const metadata: Metadata = {
  title: "TSender",
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          <Header />
          {props.children}
        </ClientProvider>
      </body>
    </html>
  );
}