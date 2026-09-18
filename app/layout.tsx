import type { Metadata } from "next";
import { passero, geistSans, geistMono } from '@/app/lib/fonts';
import "./globals.css";

export const metadata: Metadata = {
  title: "Memory Game",
  description: "Find the matching images",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex h-screen flex-col overflow-hidden">
        <div className="bg-blue-500 p-4 text-white shadow-md flex-shrink-0">
          <div className={`${passero.className} text-2xl`}>Matching Game</div>
        </div>
        <main className="flex flex-1 items-center justify-center p-4 min-h-0">{children}</main>
      </body>
    </html>
  );
}
