import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { StoreProvider } from "@/components/store-context";

export const metadata: Metadata = {
  title: "Lunelle — Everyday essentials, beautifully made.",
  description: "Elevated everyday T-shirts designed for comfort, confidence and timeless style.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
