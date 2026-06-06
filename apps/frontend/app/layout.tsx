import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frontend | Monorepo Scaffold",
  description: "Placeholder Next.js frontend app in a monorepo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
