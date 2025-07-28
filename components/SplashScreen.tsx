import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Grid, Sparkles, Download, Heart, Eye } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Loading amazing wallpapers...');

  const loadingTexts = [
    'Loading amazing wallpapers...',
    'Preparing your gallery...',
    'Curating beautiful images...',
    'Almost ready...'
  ];

  useEffect(() => {
    const duration = 3000; // 3 seconds total
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    const increment = 100 / steps;

    let currentProgress = 0;
    let textIndex = 0;

    const timer = setInterval(() => {
      currentProgress += increment;
      setProgress(Math.min(currentProgress, 100));

      // Change loading text at different progress points
      const newTextIndex = Math.floor((currentProgress / 100) * (loadingTexts.length - 1));
      if (newTextIndex !== textIndex && newTextIndex < loadingTexts.length) {
        textIndex = newTextIndex;
        setLoadingText(loadingTexts[textIndex]);
      }

      if (currentProgress >= 100) {
        clearInterval(timer);
        // Wait a bit more before transitioning
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Floating particles animation
  const particles = Array.from({ length: 8 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-60"
      animate={{
        x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
        y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
        scale: [0.5, 1, 0.5],
        opacity: [0.3, 0.8, 0.3]
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
      style={{
        left: `${20 + Math.random() * 60}%`,
        top: `${20 + Math.random() * 60}%`
      }}
    />
  ));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.2),transparent_50%)]" />
      </div>

      {/* Floating Particles */}
      {particles}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center space-y-8 px-8">
        {/* Logo Container */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 1
          }}
          className="relative"
        >
          {/* Logo Background Glow */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-xl"
          />
          
          {/* Main Logo */}
          <motion.div
            animate={{
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl"
          >
            <Grid className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            
            {/* Sparkle Effects */}
            <motion.div
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="absolute -top-2 -right-2"
            >
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* App Name */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center"
        >
          <motion.h1
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_100%]"
          >
            WallpaperHub
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-slate-600 dark:text-slate-400 mt-2 text-lg"
          >
            Discover Beautiful Wallpapers
          </motion.p>
        </motion.div>

        {/* Feature Icons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex items-center space-x-6"
        >
          {[
            { icon: Download, delay: 0 },
            { icon: Heart, delay: 0.2 },
            { icon: Eye, delay: 0.4 }
          ].map(({ icon: Icon, delay }, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.5 + delay, duration: 0.4 }}
              whileHover={{ scale: 1.2 }}
              className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg border border-slate-200/50 dark:border-slate-700/50"
            >
              <Icon className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </motion.div>
          ))}
        </motion.div>

        {/* Loading Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="w-full max-w-xs space-y-4"
        >
          {/* Loading Text */}
          <motion.p
            key={loadingText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center text-slate-600 dark:text-slate-400 text-sm"
          >
            {loadingText}
          </motion.p>

          {/* Progress Bar Container */}
          <div className="relative">
            {/* Background */}
            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              {/* Progress Fill */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full relative"
              >
                {/* Shimmer Effect */}
                <motion.div
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                />
              </motion.div>
            </div>

            {/* Progress Percentage */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2"
            >
              <span className="text-xs text-slate-500 dark:text-slate-500 font-medium">
                {Math.round(progress)}%
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Loading Dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.4 }}
          className="flex space-x-2"
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2
              }}
              className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
            />
          ))}
        </motion.div>
      </div>

      {/* Bottom Wave Animation */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 0.1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden"
      >
        <motion.div
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 transform -skew-y-1"
          style={{
            width: '200%',
            height: '100%'
          }}
        />
      </motion.div>
    </motion.div>
  );
}