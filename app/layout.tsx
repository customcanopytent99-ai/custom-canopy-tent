import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";

export const metadata: Metadata = {
  title: "Custom Tent Canopy — Premium Custom Event Tents",
  description: "Engineered for resilience. Tailored for your brand. Shop premium custom tent canopies — 10x10, 10x15, 10x20 sizes with full customization.",
  keywords: "custom tent canopy, event tent, pop-up tent, branded canopy, 10x10 tent, trade show tent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans m-0 p-0 antialiased bg-brand-gray-light text-brand-text-dark">
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
