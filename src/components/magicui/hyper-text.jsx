"use client";;
import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const DEFAULT_CHARACTER_SET = Object.freeze("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));

const getRandomInt = max => Math.floor(Math.random() * max);

export function HyperText({
  children,
  className,
  duration = 800,
  delay = 0,
  as: Component = "div",
  startOnView = false,
  animateOnHover = true,
  characterSet = DEFAULT_CHARACTER_SET,
  ...props
}) {
  const MotionComponent = motion.create(Component, {
    forwardMotionProps: true,
  });

  const [displayText, setDisplayText] = useState(() =>
    children.split(""));
  const [isAnimating, setIsAnimating] = useState(false);
  const iterationCount = useRef(0);
  const elementRef = useRef(null);

  const handleAnimationTrigger = () => {
    if (animateOnHover && !isAnimating) {
      iterationCount.current = 0;
      setIsAnimating(true);
    }
  };

  // Handle animation start based on view or delay
  useEffect(() => {
    if (!startOnView) {
      const startTimeout = setTimeout(() => {
        setIsAnimating(true);
      }, delay);
      return () => clearTimeout(startTimeout);
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          setIsAnimating(true);
        }, delay);
        observer.disconnect();
      }
    }, { threshold: 0.1, rootMargin: "-30% 0px -30% 0px" });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, startOnView]);

  // Handle scramble animation
  useEffect(() => {
    if (!isAnimating) return;

    const intervalDuration = duration / (children.length * 10);
    const maxIterations = children.length;

    const interval = setInterval(() => {
      if (iterationCount.current < maxIterations) {
        setDisplayText((currentText) =>
          currentText.map((letter, index) =>
            letter === " "
              ? letter
              : index <= iterationCount.current
                ? children[index]
                : characterSet[getRandomInt(characterSet.length)]));
        iterationCount.current = iterationCount.current + 0.1;
      } else {
        setIsAnimating(false);
        clearInterval(interval);
      }
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [children, duration, isAnimating, characterSet]);

  return (
    <MotionComponent
      ref={elementRef}
      className={cn("overflow-hidden py-2 text-4xl font-bold", className)}
      onMouseEnter={handleAnimationTrigger}
      {...props}>
      <AnimatePresence>
        {displayText.map((letter, index) => (
          <motion.span key={index} className={cn("font-mono", letter === " " ? "w-3" : "")}>
            {letter.toUpperCase()}
          </motion.span>
        ))}
      </AnimatePresence>
    </MotionComponent>
  );
}
