import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Download, Heart, Filter, Grid, List, X, Menu } from 'lucide-react';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from './components/ui/sheet';
import { WallpaperGrid } from './components/WallpaperGrid';
import { WallpaperModal } from './components/WallpaperModal';
import { SplashScreen } from './components/SplashScreen';

const categories = [
  { id: 'all', name: 'All', count: 1234 },
  { id: 'nature', name: 'Nature', count: 456 },
  { id: 'abstract', name: 'Abstract', count: 234 },
  { id: 'minimalist', name: 'Minimalist', count: 189 },
  { id: 'architecture', name: 'Architecture', count: 167 },
  { id: 'space', name: 'Space', count: 123 },
  { id: 'textures', name: 'Textures', count: 98 },
  { id: 'animals', name: 'Animals', count: 87 }
];

const mockWallpapers = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
    title: 'Mountain Landscape',
    category: 'nature',
    downloads: 1234,
    likes: 567,
    author: 'John Doe',
    width: 400,
    height: 600
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=500&fit=crop',
    title: 'Abstract Gradient',
    category: 'abstract',
    downloads: 892,
    likes: 234,
    author: 'Jane Smith',
    width: 400,
    height: 500
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=700&fit=crop',
    title: 'Minimal Geometry',
    category: 'minimalist',
    downloads: 456,
    likes: 123,
    author: 'Alex Johnson',
    width: 400,
    height: 700
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?w=400&h=550&fit=crop',
    title: 'Modern Architecture',
    category: 'architecture',
    downloads: 678,
    likes: 345,
    author: 'Sarah Wilson',
    width: 400,
    height: 550
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop',
    title: 'Galaxy Stars',
    category: 'space',
    downloads: 1001,
    likes: 789,
    author: 'Mike Chen',
    width: 400,
    height: 600
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400&h=500&fit=crop',
    title: 'Desert Dunes',
    category: 'nature',
    downloads: 543,
    likes: 267,
    author: 'Emma Davis',
    width: 400,
    height: 500
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=650&fit=crop',
    title: 'Concrete Texture',
    category: 'textures',
    downloads: 321,
    likes: 156,
    author: 'David Brown',
    width: 400,
    height: 650
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=400&h=600&fit=crop',
    title: 'Majestic Lion',
    category: 'animals',
    downloads: 876,
    likes: 432,
    author: 'Lisa Garcia',
    width: 400,
    height: 600
  }
];

function MainApp() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWallpaper, setSelectedWallpaper] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const filteredWallpapers = useMemo(() => {
    return mockWallpapers.filter(wallpaper => {
      const matchesCategory = selectedCategory === 'all' || wallpaper.category === selectedCategory;
      const matchesSearch = wallpaper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           wallpaper.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800"
    >
      {/* Mobile-Optimized Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50"
      >
        <div className="px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 flex-shrink-0"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Grid className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <span className="text-lg sm:text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                WallpaperHub
              </span>
            </motion.div>

            {/* Mobile Search & Actions */}
            <div className="flex items-center space-x-2">
              {/* Search - Expandable on mobile */}
              <div className="relative">
                <motion.div
                  initial={false}
                  animate={{ 
                    width: isSearchExpanded ? '240px' : '40px',
                    opacity: isSearchExpanded ? 1 : 0.8
                  }}
                  className="sm:w-80 relative"
                >
                  <Search 
                    className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 cursor-pointer sm:cursor-default" 
                    onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                  />
                  <Input
                    type="text"
                    placeholder="Search wallpapers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchExpanded(true)}
                    onBlur={() => searchQuery === '' && setIsSearchExpanded(false)}
                    className={`pl-9 sm:pl-10 h-10 bg-slate-100/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 ${
                      !isSearchExpanded ? 'opacity-0 pointer-events-none sm:opacity-100 sm:pointer-events-auto' : ''
                    }`}
                  />
                </motion.div>
              </div>

              {/* View Toggle - Hidden on small mobile */}
              <div className="hidden sm:flex items-center space-x-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-10 px-3 transition-all duration-200"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-10 px-3 transition-all duration-200"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              {/* Mobile Menu - Fixed ref issue */}
              <div className="sm:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <button className="inline-flex items-center justify-center h-10 w-10 rounded-md border border-slate-200 dark:border-slate-700 bg-transparent hover:bg-accent hover:text-accent-foreground">
                      <Menu className="w-5 h-5" />
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80">
                    <div className="py-6">
                      <h3 className="text-lg mb-4">View Options</h3>
                      <div className="space-y-3">
                        <Button
                          variant={viewMode === 'grid' ? 'default' : 'outline'}
                          onClick={() => setViewMode('grid')}
                          className="w-full justify-start"
                        >
                          <Grid className="w-4 h-4 mr-2" />
                          Grid View
                        </Button>
                        <Button
                          variant={viewMode === 'list' ? 'default' : 'outline'}
                          onClick={() => setViewMode('list')}
                          className="w-full justify-start"
                        >
                          <List className="w-4 h-4 mr-2" />
                          List View
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile-Optimized Categories */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="px-4 sm:px-6 py-4"
      >
        {/* Horizontal scrolling categories for mobile */}
        <div className="flex overflow-x-auto space-x-2 pb-2 scrollbar-hide">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 + index * 0.03 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <Badge
                variant={selectedCategory === category.id ? "default" : "secondary"}
                className={`cursor-pointer px-4 py-2.5 text-sm whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === category.id 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name} ({category.count})
              </Badge>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Results Counter */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="px-4 sm:px-6 pb-2"
      >
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {filteredWallpapers.length} wallpapers found
        </p>
      </motion.div>

      {/* Wallpaper Grid */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="px-4 sm:px-6 pb-20 sm:pb-12"
      >
        <WallpaperGrid 
          wallpapers={filteredWallpapers}
          onWallpaperClick={setSelectedWallpaper}
          viewMode={viewMode}
        />
      </motion.div>

      {/* Wallpaper Modal */}
      <AnimatePresence>
        {selectedWallpaper && (
          <WallpaperModal
            wallpaper={selectedWallpaper}
            onClose={() => setSelectedWallpaper(null)}
          />
        )}
      </AnimatePresence>

      {/* Add scrollbar hide utility */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </motion.div>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <AnimatePresence mode="wait">
      {showSplash ? (
        <SplashScreen key="splash" onComplete={handleSplashComplete} />
      ) : (
        <MainApp key="main" />
      )}
    </AnimatePresence>
  );
}