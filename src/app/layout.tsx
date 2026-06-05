import type { Metadata } from "next";
import { Cinzel, DM_Sans } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JoseyMap — Cannabis Treasure Hunts",
  description:
    "Your digital companion for cannabis treasure map events. Check in, redeem offers, and leave reviews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${cinzel.variable} ${dmSans.variable} font-sans antialiased bg-map-dark text-text-primary`}
      >
        {children}
      </body>
    </html>
  );
}
