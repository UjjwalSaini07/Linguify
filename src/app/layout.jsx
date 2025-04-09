import { Manrope } from "next/font/google";
import { ThemeProvider } from "next-themes";
import ThemeTogglebutton from "@/components/ui/ThemeToggle";
import { Toaster } from "@/components/ui/sonner";
import CodeLogo from "../assests/CodeLogo";
import "./globals.css";

const font = Manrope({ subsets: ["latin"] });

export const metadata = {
  title: "Linguify - Code Without Borders",
  description:
    "Effortlessly transform your code into over 35 programming languages with the power of AI. Streamline development and expand compatibility—all in just a single step!",
  metadataBase: new URL("https://http://localhost:3000/"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${font.className} overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <nav className="sticky top-0 backdrop-blur-md bg-background/20 border-b border-gray-200/10 shadow-md rounded-b-xl z-50 flex items-center justify-between py-3 px-6 md:px-12">
            <div className="flex items-center gap-2 cursor-pointer">
              <CodeLogo className="w-6.5 h-6.5 text-primary hover:text-secondary transition-colors duration-300" />
              <h1 className="text-xl font-bold md:text-2xl tracking-tight text-primary hover:scale-105 transition-transform duration-300">
                Linguify<span className="text-[#08fd5d]">.</span>
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <ThemeTogglebutton className="p-2 rounded-lg bg-gray-100/10 hover:bg-gray-100/20 transition-all duration-300" />
            </div>
          </nav>

          <main className="px-6 md:px-12 py-8">{children}</main>

          <Toaster
            richColors
            position="top-center"
            toastOptions={{
              className: "shadow-lg border border-gray-200/10 rounded-lg",
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
