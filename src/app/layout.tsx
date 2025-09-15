import type { Metadata } from "next";
import { Inter } from "next/font/google"; // 👈 importa Inter
import { Toaster } from "sonner";
import "./globals.css";

// 👇 configura Inter como a única fonte
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Email Classifier",
  description: "Classifique emails como produtivos ou improdutivos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} antialiased font-sans`} // 👈 só Inter
      >
        <Toaster
          position="top-center"
          expand={true}
          richColors
          closeButton
          theme="dark"
          duration={3000}
        />
        {children}
      </body>
    </html>
  );
}
