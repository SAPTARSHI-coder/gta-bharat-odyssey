import React from 'react';
import { motion } from 'framer-motion';

interface ParticlesProps {
  count?: number;
  color?: string;
}

export function Particles({ count = 30, color = '#b347ff' }: ParticlesProps) {
  const particles = Array.from({ length: count }, (_, i) => i);
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((i) => {
        const size = Math.random() * 3 + 1;
        const startX = Math.random() * 100;
        const duration = Math.random() * 10 + 8;
        const delay = Math.random() * 10;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${startX}%`,
              bottom: '-10px',
              background: color,
              boxShadow: `0 0 ${size * 2}px ${color}`,
            }}
            animate={{
              y: [0, -window.innerHeight - 100],
              x: [0, (Math.random() - 0.5) * 200],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        );
      })}
    </div>
  );
}
