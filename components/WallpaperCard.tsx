import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Heart, Eye, User, MoreVertical } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

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

interface WallpaperCardProps {
  wallpaper: Wallpaper;
  onClick: () => void;
  viewMode: 'grid' | 'list';
}

export function WallpaperCard({ wallpaper, onClick, viewMode }: WallpaperCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Downloading:', wallpaper.title);
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileTap={{ scale: 0.98 }}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg active:shadow-md"
        onClick={onClick}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="flex">
          {/* Mobile-optimized image */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-32 flex-shrink-0">
            <ImageWithFallback
              src={wallpaper.url}
              alt={wallpaper.title}
              className="w-full h-full object-cover"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute inset-0 bg-black/20 flex items-center justify-center"
            >
              <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </motion.div>
          </div>
          
          {/* Content */}
          <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between min-w-0">
            <div className="flex-1">
              <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-1 truncate text-sm sm:text-base">
                {wallpaper.title}
              </h3>
              <div className="flex items-center space-x-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-2">
                <User className="w-3 h-3" />
                <span className="truncate">{wallpaper.author}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {wallpaper.category}
              </Badge>
            </div>
            
            {/* Actions */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-3 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center space-x-1">
                  <Download className="w-3 h-3" />
                  <span>{wallpaper.downloads > 999 ? `${Math.floor(wallpaper.downloads/1000)}k` : wallpaper.downloads}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="w-3 h-3" />
                  <span>{wallpaper.likes > 999 ? `${Math.floor(wallpaper.likes/1000)}k` : wallpaper.likes}</span>
                </div>
              </div>
              
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleLike}
                  className={`h-8 w-8 p-0 transition-colors duration-200 ${
                    isLiked ? 'text-red-500' : 'text-slate-400 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleDownload}
                  className="h-8 w-8 p-0 text-slate-400 hover:text-blue-500 transition-colors duration-200"
                >
                  <Download className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      className="group bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl active:shadow-lg"
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <ImageWithFallback
          src={wallpaper.url}
          alt={wallpaper.title}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Mobile-friendly overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
        >
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center justify-between mb-2">
              <Badge 
                variant="secondary" 
                className="bg-white/90 text-slate-800 backdrop-blur-sm text-xs"
              >
                {wallpaper.category}
              </Badge>
              <div className="flex space-x-1">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleLike}
                    className={`h-8 w-8 p-0 bg-white/20 backdrop-blur-sm border-white/20 hover:bg-white/30 transition-all duration-200 ${
                      isLiked ? 'text-red-500' : 'text-white hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleDownload}
                    className="h-8 w-8 p-0 bg-white/20 backdrop-blur-sm border-white/20 hover:bg-white/30 text-white hover:text-blue-400 transition-all duration-200"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </Button>
                </motion.div>
              </div>
            </div>
            
            {/* Mobile-optimized content */}
            <div className="flex items-center justify-between text-white">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium mb-1 text-sm truncate">{wallpaper.title}</h3>
                <div className="flex items-center space-x-1 text-xs text-white/80">
                  <User className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{wallpaper.author}</span>
                </div>
              </div>
              <div className="text-xs text-white/80 text-right ml-2 flex-shrink-0">
                <div className="flex items-center space-x-1">
                  <Download className="w-3 h-3" />
                  <span>{wallpaper.downloads > 999 ? `${Math.floor(wallpaper.downloads/1000)}k` : wallpaper.downloads}</span>
                </div>
                <div className="flex items-center space-x-1 mt-0.5">
                  <Heart className="w-3 h-3" />
                  <span>{wallpaper.likes > 999 ? `${Math.floor(wallpaper.likes/1000)}k` : wallpaper.likes}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile tap indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0
          }}
          className="absolute top-3 right-3"
        >
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
            <Eye className="w-3.5 h-3.5 text-white" />
          </div>
        </motion.div>
      </div>

      {/* Mobile-optimized footer */}
      <div className="p-3">
        <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-1 truncate text-sm">
          {wallpaper.title}
        </h3>
        <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
          <div className="flex items-center space-x-1 min-w-0">
            <User className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{wallpaper.author}</span>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="flex items-center space-x-1">
              <Download className="w-3 h-3" />
              <span>{wallpaper.downloads > 999 ? `${Math.floor(wallpaper.downloads/1000)}k` : wallpaper.downloads}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-3 h-3" />
              <span>{wallpaper.likes > 999 ? `${Math.floor(wallpaper.likes/1000)}k` : wallpaper.likes}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}