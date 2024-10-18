import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import {  ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "@/components/ui/toaster";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const outfit = Outfit({ subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Admin RentalCars",
  description: "Proyecto de titulo, Silva Jose y Contador Daniel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <PayPalScriptProvider options={{"clientId":"AYj-WBuTRhZOEeflKhKZzzFu2oWlaLp4hDnknCpJc7xuO5Ghz6PZR-I_ITfwPRr11NVj5tS1WiRyHp-y"}}>
        <html lang="es">
          <body className={outfit.className}>
            <NextTopLoader color="#000"/>
            {children}
            <Toaster/>
          </body>
        </html>  
      </PayPalScriptProvider>
    </ClerkProvider>  
  );
}
