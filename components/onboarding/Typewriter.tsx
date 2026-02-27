import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';

interface TypewriterProps {
  text: string;
  delay?: number;
  onComplete?: () => void;
  className?: string;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, delay = 0, onComplete, className }) => {
  const [isDone, setIsDone] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));

  // Use a ref to store the latest onComplete callback without triggering re-renders
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Reset state when text changes
    setIsDone(false);
    count.set(0);

    const controls = animate(count, text.length, {
      type: "tween",
      duration: text.length * 0.03, // 30ms per character for smooth typing
      delay: delay / 1000,
      ease: "linear",
      onComplete: () => {
        setIsDone(true);
        if (onCompleteRef.current) onCompleteRef.current();
      }
    });

    return controls.stop;
  }, [text, delay, count]); // Removed onComplete from dependencies

  return (
    <div className={`${className}`} dir="rtl">
      <motion.span>{displayText}</motion.span>
      <span className={`inline-block w-3 h-[1em] ml-1 align-middle bg-current ${isDone ? 'animate-pulse opacity-50' : 'animate-pulse'}`} />
    </div>
  );
};

export default Typewriter;
