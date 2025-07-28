import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Download, Heart, Share, Info, Monitor, Smartphone, Tablet, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
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

interface WallpaperModalProps {
  wallpaper: Wallpaper;
  onClose: () => void;
}

export function WallpaperModal({ wallpaper, onClose }: WallpaperModalProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState('mobile');
  const [showDetails, setShowDetails] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleDownload = (device: string) => {
    console.log(`Downloading ${wallpaper.title} for ${device}`);
  };

  const handleShare = () => {
    console.log('Sharing:', wallpaper.title);
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.9,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const mobileModalVariants = {
    hidden: { 
      opacity: 0, 
      y: '100%'
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      y: '100%',
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <motion.div
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Desktop Modal */}
      <div className="hidden md:flex items-center justify-center p-4 h-full">
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex h-full">
            {/* Image Section */}
            <div className="flex-1 relative bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <ImageWithFallback
                src={wallpaper.url}
                alt={wallpaper.title}
                className="max-w-full max-h-full object-contain"
              />
              
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full p-2 text-white transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Info Panel */}
            <div className="w-80 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-700 flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  {wallpaper.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-3">
                  by {wallpaper.author}
                </p>
                <Badge variant="secondary" className="mb-4">
                  {wallpaper.category}
                </Badge>
                
                {/* Stats */}
                <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
                  <div className="flex items-center space-x-1">
                    <Download className="w-4 h-4" />
                    <span>{wallpaper.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{wallpaper.likes.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 space-y-4">
                <div className="flex space-x-2">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1"
                  >
                    <Button
                      onClick={handleLike}
                      variant={isLiked ? "default" : "outline"}
                      className={`w-full transition-all duration-200 ${
                        isLiked 
                          ? 'bg-red-500 hover:bg-red-600 text-white' 
                          : 'hover:bg-red-50 hover:text-red-500 hover:border-red-200'
                      }`}
                    >
                      <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                      {isLiked ? 'Liked' : 'Like'}
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      variant="outline"
                      onClick={handleShare}
                      className="hover:bg-blue-50 hover:text-blue-500 hover:border-blue-200 transition-all duration-200"
                    >
                      <Share className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </div>

                <Separator />

                {/* Device Selection */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                    Download for:
                  </label>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[
                      { id: 'desktop', icon: Monitor, label: 'Desktop' },
                      { id: 'mobile', icon: Smartphone, label: 'Mobile' },
                      { id: 'tablet', icon: Tablet, label: 'Tablet' }
                    ].map((device) => (
                      <motion.button
                        key={device.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedDevice(device.id)}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center space-y-1 ${
                          selectedDevice === device.id
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                        }`}
                      >
                        <device.icon className="w-5 h-5" />
                        <span className="text-xs">{device.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={() => handleDownload(selectedDevice)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download {wallpaper.width} × {wallpaper.height}
                  </Button>
                </motion.div>
              </div>

              {/* Image Info */}
              <div className="mt-auto p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400 mb-2">
                  <Info className="w-4 h-4" />
                  <span>Image Details</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Resolution:</span>
                    <span className="text-slate-900 dark:text-slate-100">{wallpaper.width} × {wallpaper.height}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Category:</span>
                    <span className="text-slate-900 dark:text-slate-100 capitalize">{wallpaper.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">File ID:</span>
                    <span className="text-slate-900 dark:text-slate-100">#{wallpaper.id}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Full-Screen Modal */}
      <motion.div
        variants={mobileModalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="md:hidden fixed inset-0 bg-white dark:bg-slate-900 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                {wallpaper.title}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                by {wallpaper.author}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`p-2 ${isLiked ? 'text-red-500' : 'text-slate-600'}`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
            </motion.div>
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="p-2 text-slate-600"
              >
                <Share className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Image */}
        <div className="flex-1 relative bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
          <ImageWithFallback
            src={wallpaper.url}
            alt={wallpaper.title}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Mobile Bottom Panel */}
        <div className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
          {/* Quick Info */}
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="secondary">
                {wallpaper.category}
              </Badge>
              <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center space-x-1">
                  <Download className="w-4 h-4" />
                  <span>{wallpaper.downloads > 999 ? `${Math.floor(wallpaper.downloads/1000)}k` : wallpaper.downloads}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span>{wallpaper.likes > 999 ? `${Math.floor(wallpaper.likes/1000)}k` : wallpaper.likes}</span>
                </div>
              </div>
            </div>

            {/* Device Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Download for:
              </label>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[
                  { id: 'mobile', icon: Smartphone, label: 'Mobile' },
                  { id: 'tablet', icon: Tablet, label: 'Tablet' },
                  { id: 'desktop', icon: Monitor, label: 'Desktop' }
                ].map((device) => (
                  <motion.button
                    key={device.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedDevice(device.id)}
                    className={`p-3 rounded-xl border-2 transition-all duration-200 flex flex-col items-center space-y-1 ${
                      selectedDevice === device.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                        : 'border-slate-200 dark:border-slate-700 active:bg-slate-50 dark:active:bg-slate-800'
                    }`}
                  >
                    <device.icon className="w-5 h-5" />
                    <span className="text-xs">{device.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Download Button */}
            <motion.div whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => handleDownload(selectedDevice)}
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg active:shadow-md transition-all duration-200"
              >
                <Download className="w-5 h-5 mr-2" />
                Download {wallpaper.width} × {wallpaper.height}
              </Button>
            </motion.div>

            {/* Expandable Details */}
            <motion.div
              initial={false}
              animate={{ height: showDetails ? 'auto' : '0px' }}
              className="overflow-hidden"
            >
              <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Resolution:</span>
                    <span className="text-slate-900 dark:text-slate-100">{wallpaper.width} × {wallpaper.height}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Category:</span>
                    <span className="text-slate-900 dark:text-slate-100 capitalize">{wallpaper.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">File ID:</span>
                    <span className="text-slate-900 dark:text-slate-100">#{wallpaper.id}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Toggle Details Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-center space-x-2 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              <Info className="w-4 h-4" />
              <span>{showDetails ? 'Hide Details' : 'Show Details'}</span>
              {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}