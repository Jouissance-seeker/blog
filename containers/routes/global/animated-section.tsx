'use client';

import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

export const AnimatedSection = (props: PropsWithChildren) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
      animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      exit={{ opacity: 0, filter: 'blur(10px)', y: -20 }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
        filter: { duration: 0.2 },
      }}
    >
      {props.children}
    </motion.div>
  );
};
