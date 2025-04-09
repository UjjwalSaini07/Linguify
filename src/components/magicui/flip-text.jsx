"use client";;
import { AnimatePresence, motion } from "motion/react";

import { cn } from "../../lib/utils";
import React from "react";

const defaultVariants = {
  hidden: { rotateX: -90, opacity: 0 },
  visible: { rotateX: 0, opacity: 1 },
};

export function FlipText({
  children,
  duration = 0.5,
  delayMultiple = 0.08,
  className,
  as: Component = "span",
  variants,
  ...props
}) {
  const MotionComponent = motion.create(Component);
  const characters = React.Children.toArray(children).join("").split("");

  return (
    <div className="flex justify-center space-x-2">
      <AnimatePresence mode="wait">
        {characters.map((char, i) => (
          <MotionComponent
            key={i}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants || defaultVariants}
            transition={{ duration, delay: i * delayMultiple }}
            className={cn("origin-center drop-shadow-sm", className)}
            {...props}>
            {char}
          </MotionComponent>
        ))}
      </AnimatePresence>
    </div>
  );
}
