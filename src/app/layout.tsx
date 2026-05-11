import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Rinko - ゼミ輪講管理",
  description: "工学系ゼミのためのモダンな輪講管理アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${inter.variable} dark antialiased`}>
      <body className="flex flex-col min-h-screen bg-background text-foreground bg-gray-950 pb-20 sm:pb-0">
        <Header />
        <main className="flex-1 w-full max-w-md mx-auto sm:max-w-3xl overflow-x-hidden p-4">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
