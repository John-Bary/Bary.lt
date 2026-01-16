// app/layout.tsx
import type { Metadata } from "next";
import "./global.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "www.bary.lt — Marketing & Consulting",
  description:
    "Marketing, content, and business consulting based in Lithuania, serving teams in Spain and the United Kingdom.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="lt">
      <body className="antialiased">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
