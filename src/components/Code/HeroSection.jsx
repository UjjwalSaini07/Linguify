"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Oxygen_Mono } from "next/font/google";
import Spline from "@splinetool/react-spline";
import { cn } from "../../lib/utils";
import Convertor from "./CodeConvertor";

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
