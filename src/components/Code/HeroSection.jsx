"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Oxygen_Mono } from "next/font/google";
import Spline from "@splinetool/react-spline";
import { cn } from "../../lib/utils";
import Convertor from "./CodeConvertor";
import { Button } from "../ui/button";

const spline_model = { 
  position: "fixed",
  top: "0",
  left: "0",
  zIndex: "0",
};

const font = Oxygen_Mono({ subsets: ["latin"], weight: ["400"] });

const HeroSection = () => {
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div 
      className="relative flex min-h-screen w-full flex-col items-center pt-20 md:pt-28 z-20 overflow-hidden rounded-lg bg-background"
    >
      <h1 className="pointer-events-none text-4xl -mt-18 z-20 whitespace-pre-wrap bg-gradient-to-b from-black to-zinc-400/80 bg-clip-text text-center md:text-6xl md:max-w-xl lg:max-w-3xl font-semibold lg:text-7xl leading-none text-transparent dark:from-white dark:to-zinc-600/80 tracking-tight">
        Revolutionize{" "}
        <span
          className={cn(font.className, "md:text-7xl text-3xl text-[#08fd5d]")}
        >
          {"{"}Code{"}"}
        </span>{" "}
        Creation with the
        <span className={"text-[#08fd5d]"}>{""} Power </span>
          {""}of
        <span className={"text-[#08fd5d]"}>{""} AI</span>
      </h1>
      <p className="md:text-xl pt-5 font-light px-4 z-20 text-pretty text-center text-muted-foreground max-w-prose">
        with Linguify, effortlessly paste your code and watch it transform in seconds!
      </p>
      {/* <Button
        asChild
        className="relative z-20 mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white font-semibold text-sm shadow-lg rounded-full overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl active:scale-95"
        variant={"secondary"}
      >
        <a
          rel="noopener"
          href="https://github.com/UjjwalSaini07/Linguify"
          target="_blank"
          className="relative flex items-center justify-center"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-700 via-pink-700 to-red-700 opacity-30 animate-pulse motion-reduce:animate-none"
          ></span>
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full border-2 border-transparent bg-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-spin-slow opacity-50 transition-opacity hover:opacity-70"
          ></span>
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-800 via-pink-800 to-red-800 opacity-0 transition-opacity duration-300 hover:opacity-20"
          ></span>
          <span className="relative z-20 font-bold">Visit GitHub</span>
        </a>
      </Button> */}
      {theme === "dark" && !isMobile && (
        <Spline 
          style={spline_model} 
          scene="https://prod.spline.design/WDf01kZfl0tgDLbA/scene.splinecode"
        />
      )}
      <Convertor />
      <footer className="absolute bottom-2 mt-4 md:right-20 border py-2 px-3 bg-green-100/60 dark:bg-green-950/60 border-emerald-700 rounded-md text-green-900 dark:text-green-200 z-[51]">
        made by{" "}
        <a
          href="https://github.com/UjjwalSaini07"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-500 hover:underline"
        >
          UjjwalS❤️
        </a>
      </footer>
    </div>
  );
};

export default HeroSection;
