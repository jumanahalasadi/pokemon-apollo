import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers/provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Leonardo.Ai Challenge - PokeAPI",
  description: "A next + graphql app using PokeAPI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
