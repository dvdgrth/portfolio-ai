import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_SITE_NAME}`,
  description: `Persönliche Webseite von ${process.env.NEXT_PUBLIC_SITE_NAME}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">
        <div className="h-screen flex flex-col">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
