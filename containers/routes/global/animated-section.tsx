'use client';

import { motion } from 'framer-motion';
import { PropsWithChildren, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export const AnimatedSection = (props: PropsWithChildren) => {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const timer = setTimeout(() => {
        const elements = document.querySelectorAll('[data-animated-section]');
        elements.forEach((element) => {
          if (element instanceof HTMLElement && element.style.opacity === '0') {
            element.style.opacity = '1';
            element.style.filter = 'blur(0px)';
            element.style.transform = 'translateY(0px)';
          }
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  if (!isClient) {
    return <div style={{ opacity: 1 }}>{props.children}</div>;
  }

  return (
    <motion.div
      key={pathname}
      data-animated-section
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
