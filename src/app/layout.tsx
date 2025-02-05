import type { Metadata } from "next";
import "./globals.css";
import Provider from "./provider";
import { ConnectWalletButton } from "./components/ConnectWalletButton";
import NetworkSwitch from "./components/NetworkSwitch";
import { Toaster } from "react-hot-toast";

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
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#333",
                color: "#fff",
                maxWidth: "500px",
              },
            }}
          />
        </Provider>
      </body>
    </html>
  );
}
