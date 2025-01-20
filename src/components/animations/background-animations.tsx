'use client';

import { motion } from 'framer-motion';

export const WavePattern = () => (
  <div className="absolute bottom-0 left-0 w-full h-[30vh] overflow-hidden opacity-10 pointer-events-none">
    <svg width="100%" height="100%" viewBox="0 0 1440 200" preserveAspectRatio="none">
      <motion.path
        d="M0,50 C320,75 420,0 640,50 C860,100 960,25 1180,75 L1440,50 L1440,200 L0,200 Z"
        fill="#4CAF50"
        initial={{ d: "M0,50 C320,75 420,0 640,50 C860,100 960,25 1180,75 L1440,50 L1440,200 L0,200 Z" }}
        animate={{
          d: [
            "M0,50 C320,75 420,0 640,50 C860,100 960,25 1180,75 L1440,50 L1440,200 L0,200 Z",
            "M0,75 C320,50 420,75 640,25 C860,75 960,50 1180,50 L1440,75 L1440,200 L0,200 Z",
            "M0,50 C320,75 420,0 640,50 C860,100 960,25 1180,75 L1440,50 L1440,200 L0,200 Z"
          ]
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut"
        }}
      />
    </svg>
  </div>
);

export const NetworkPattern = () => (
  <div className="absolute top-0 left-0 w-full h-[50vh] overflow-hidden opacity-5 pointer-events-none">
    <svg width="100%" height="100%" viewBox="0 0 800 400">
      <defs>
        <motion.path
          id="network-circle"
          d="M25,25 m-20,0 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0"
          fill="none"
          stroke="#4CAF50"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      </defs>
      
      {[...Array(12)].map((_, i) => (
        <g key={i} transform={`translate(${(i % 4) * 200 + 100}, ${Math.floor(i / 4) * 100 + 50})`}>
          <use href="#network-circle" />
          <motion.line
            x1="20"
            y1="0"
            x2="180"
            y2="0"
            stroke="#4CAF50"
            strokeWidth="0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.line
            x1="0"
            y1="20"
            x2="0"
            y2="80"
            stroke="#4CAF50"
            strokeWidth="0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{
              duration: 3,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </g>
      ))}
    </svg>
  </div>
);

export const FloatingCircles = () => (
  <div className="absolute top-0 left-0 w-full h-[40vh] overflow-hidden opacity-8 pointer-events-none">
    <svg width="100%" height="100%" viewBox="0 0 500 500">
      {[...Array(10)].map((_, i) => (
        <motion.circle
          key={i}
          cx={Math.random() * 500}
          cy={Math.random() * 500}
          r={Math.random() * 8 + 2}
          fill="#4CAF50"
          initial={{
            opacity: 0,
            y: 500,
          }}
          animate={{
            opacity: [0, 0.3, 0],
            y: -100,
            transition: {
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear"
            }
          }}
        />
      ))}
    </svg>
  </div>
);
