import "../styles/globals.css";
import "../styles/tailwind.css";

import { Fira_Code } from "@next/font/google";

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-fira",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={firaCode.variable}>
      <head />
      <body className="font-mono">{children}</body>
    </html>
  );
}
