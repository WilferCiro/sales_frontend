import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { decrypt } from "@/data/constantStore";
import AllProviders from "@/presentation/components/organisms/AllProviders/AllProviders";
import { ColorScheme } from "@mantine/core";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Space",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const theme = decrypt(cookieStore.get("theme")?.value || "");

  return (
    <html lang="en">
      <body className={inter.className}>
        <AllProviders theme={theme as ColorScheme}>
          {children}
        </AllProviders>
      </body>
    </html>
  );
}
