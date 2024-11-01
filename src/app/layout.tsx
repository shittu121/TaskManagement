import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/Header";
import { Sidebarsm } from "@/components/SidebarSm"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-y-hidden`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex bg-neutral-100 overflow-y-auto overflow-x-hidden dark:bg-[#121212]">
            <ToastContainer />
              <div className="lg:w-[20rem]">
              <div className="sm-hidden fixed md:hidden lg:flex">
                <Sidebar />
              </div>
              <div className="lg:hidden z-50 fixed max-w-[300px]">
                <Sidebarsm />
              </div>
              </div>
              <div className="w-full h-screen">
                <header className="w-full bg-white lg:w-[65rem] z-50">
                  <Header />
                </header>
                
               <div className="px-20 w-full mt-8 lg:mt-36">
                 {children}
               </div>
              </div>
            </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
