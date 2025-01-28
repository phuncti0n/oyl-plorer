import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Provider from "./provider";
import { ConnectWalletButton } from "./components/ConnectWalletButton";

export const metadata: Metadata = {
  title: "Oyl Pump",
  description: "Explore Alkanes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ConnectWalletButton />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
