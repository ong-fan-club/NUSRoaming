import "./globals.css";
import { Inter } from "next/font/google";
import NavBar from "../components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NUSRoaming",
  description: "NUS SEP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " min-h-screen"}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
