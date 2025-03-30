import React from "react";
import type { Metadata } from "next";
import ReduxProvider from "@/components/ReduxProvider";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Pokedex Web",
  description: "A simple pokedex web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
