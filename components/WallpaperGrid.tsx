import React from 'react';
import { motion } from 'framer-motion';
import { WallpaperCard } from './WallpaperCard';

interface Wallpaper {
  id: number;
  url: string;
  title: string;
  category: string;
  downloads: number;
  likes: number;
  author: string;
  width: number;
  height: number;
}

interface WallpaperGridProps {
  wallpapers: Wallpaper[];
  onWallpaperClick: (wallpaper: Wallpaper) => void;
  viewMode: 'grid' | 'list';
}

export function WallpaperGrid({ wallpapers, onWallpaperClick, viewMode }: WallpaperGridProps) {
  // Safety check to ensure wallpapers is defined and is an array
  const safeWallpapers = Array.isArray(wallpapers) ? wallpapers : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-3 sm:space-y-4"
      >
        {safeWallpapers.map((wallpaper, index) => (
          <motion.div
            key={wallpaper.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.03 }}
          >
            <WallpaperCard
              wallpaper={wallpaper}
              onClick={() => onWallpaperClick(wallpaper)}
              viewMode="list"
            />
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Masonry Grid using CSS columns */}
      <div className="masonry-container">
        {safeWallpapers.map((wallpaper, index) => (
          <motion.div
            key={wallpaper.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.03 }}
            className="masonry-item"
          >
            <WallpaperCard
              wallpaper={wallpaper}
              onClick={() => onWallpaperClick(wallpaper)}
              viewMode="grid"
            />
          </motion.div>
        ))}
      </div>

      {/* Fallback message if no wallpapers */}
      {safeWallpapers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-slate-400 text-lg mb-2">No wallpapers found</div>
          <div className="text-slate-500 text-sm">Try adjusting your search or category filter</div>
        </motion.div>
      )}

      {/* Masonry CSS */}
      <style jsx>{`
        .masonry-container {
          column-count: 2;
          column-gap: 12px;
        }
        
        @media (min-width: 640px) {
          .masonry-container {
            column-count: 2;
            column-gap: 16px;
          }
        }
        
        @media (min-width: 768px) {
          .masonry-container {
            column-count: 3;
            column-gap: 16px;
          }
        }
        
        @media (min-width: 1024px) {
          .masonry-container {
            column-count: 4;
            column-gap: 16px;
          }
        }
        
        .masonry-item {
          break-inside: avoid;
          page-break-inside: avoid;
          margin-bottom: 12px;
          display: inline-block;
          width: 100%;
        }
        
        @media (min-width: 640px) {
          .masonry-item {
            margin-bottom: 16px;
          }
        }
      `}</style>
    </motion.div>
  );
}