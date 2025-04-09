import { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import ThemeTogglebutton from "@/components/ui/ThemeToggle";
import { Toaster } from "@/components/ui/sonner";

const font = Manrope({ subsets: ["latin"] });

export const metadata = {
  title: "Linguify - Code Without Borders",
  description: "Effortlessly transform your code into over 35 programming languages with the power of AI. Streamline development and expand compatibility—all in just a single step!",
  metadataBase: new URL("https://http://localhost:3000/"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${font.className} overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <nav className="sticky top-0 backdrop-blur-md border-b bg-background/20 rounded-b-xl z-50 flex items-center justify-between py-2 w-full px-6 md:px-10 shadow-md">
            <h1 className="text-lg font-semibold md:text-2xl cursor-crosshair">
              <span className="text-primary">Linguify</span>.
            </h1>
            <ThemeTogglebutton />
          </nav>
          {children}
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
