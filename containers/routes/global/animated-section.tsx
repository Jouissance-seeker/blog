'use client';

import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
import { usePathname } from 'next/navigation';

export const AnimatedSection = (props: PropsWithChildren) => {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{
        opacity: 0,
        filter: 'blur(10px)',
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
      }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {props.children}
    </motion.div>
  );
};
