import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/Header";
// import { Sidebarsm } from "@/components/SidebarSm"
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
              <div className="w-0 lg:w-[15rem] z-50">
              <div className="sm-hidden fixed md:hidden lg:flex">
                <Sidebar />
              </div>
              
              </div>
              <div className="w-full h-screen dark:bg-[#121212] ">
                <header className="w-full bg-white  z-50">
                  <Header />
                </header>
                
                
               <div className=" w-full dark:bg-[#121212]">
                 {children}
               </div>
              </div>
            </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
