import 'package:flutter/material.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';
import '../models/wallpaper.dart';
import 'wallpaper_card.dart';

class WallpaperGrid extends StatelessWidget {
  final List<Wallpaper> wallpapers;
  final Function(Wallpaper) onWallpaperClick;
  final bool isGridMode;

  const WallpaperGrid({
    Key? key,
    required this.wallpapers,
    required this.onWallpaperClick,
    this.isGridMode = true,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    if (wallpapers.isEmpty) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                Icons.image_not_supported,
                size: 64,
                color: Theme.of(context).colorScheme.onSurface.withOpacity(0.3),
              ),
              const SizedBox(height: 16),
              Text(
                'No wallpapers found',
                style: Theme.of(context).textTheme.titleLarge,
              ),
              const SizedBox(height: 8),
              Text(
                'Try adjusting your search or category filter',
                style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                  color: Theme.of(context).colorScheme.onSurface.withOpacity(0.6),
                ),
              ),
            ],
          ),
        ),
      );
    }

    return isGridMode
        ? StaggeredGrid.count(
            crossAxisCount: 2,
            mainAxisSpacing: 16,
            crossAxisSpacing: 16,
            children: wallpapers.map((wallpaper) {
              return StaggeredGridTile.count(
                crossAxisCellCount: 1,
                mainAxisCellCount: wallpaper.height / 300,
                child: WallpaperCard(
                  wallpaper: wallpaper,
                  onTap: () => onWallpaperClick(wallpaper),
                  isGridMode: true,
                ),
              );
            }).toList(),
          )
        : ListView.separated(
            padding: const EdgeInsets.all(16),
            itemCount: wallpapers.length,
            separatorBuilder: (context, index) => const SizedBox(height: 16),
            itemBuilder: (context, index) {
              return WallpaperCard(
                wallpaper: wallpapers[index],
                onTap: () => onWallpaperClick(wallpapers[index]),
                isGridMode: false,
              );
            },
          );
  }
}
