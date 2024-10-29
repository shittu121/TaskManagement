import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/Header";
import { Sidebarsm } from "@/components/SidebarSm"


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Task Management Tools",
  description: "This is a Task Management Tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex bg-neutral-100 overflow-y-hidden dark:bg-[#121212]">
              <div className="sm-hidden md:hidden lg:flex">
                <Sidebar />
              </div>
              <div className="lg:hidden">
                <Sidebarsm />
              </div>
              <div className="w-full">
               <Header />
               <div className="m-5 h-full">
                 {children}
               </div>
              </div>
            </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
