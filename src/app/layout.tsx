import type { Metadata } from "next";
import "./globals.css";
import Provider from "./provider";
import { ConnectWalletButton } from "./components/ConnectWalletButton";
import NetworkSwitch from "./components/NetworkSwitch";

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
        <Provider>
          <ConnectWalletButton />
          <NetworkSwitch />
          {children}
        </Provider>
      </body>
    </html>
  );
}
