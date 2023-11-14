import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "./components/Header";
import { Providers } from "./components/Providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "codepad.chat",
  description: "Chat with code together",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-col flex-grow p-4 sm:p-6">{children}</div>
            {/* <Footer /> */}
          </div>
        </Providers>
      </body>
    </html>
  );
}
