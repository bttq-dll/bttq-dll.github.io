// components/AnimatedText.tsx
import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedTextProps {
  text: string;
  children?: ReactNode;
  [key: string]: any;
}

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export const AnimatedText = ({ text, ...props }: AnimatedTextProps) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      style={{ display: 'flex', overflow: 'hidden' }}
      {...props}
    >
      {text.split('').map((char, index) => (
        <motion.span key={index} variants={item}>
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};