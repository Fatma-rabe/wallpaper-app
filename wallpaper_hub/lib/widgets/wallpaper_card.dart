import 'package:flutter/material.dart';
import '../models/wallpaper.dart';

class WallpaperCard extends StatefulWidget {
  final Wallpaper wallpaper;
  final VoidCallback? onTap;
  final bool isGridMode;
  final VoidCallback? onViewToggle;

  const WallpaperCard({
    Key? key,
    required this.wallpaper,
    this.onTap,
    required this.isGridMode,
    this.onViewToggle,
  }) : super(key: key);

  @override
  State<WallpaperCard> createState() => _WallpaperCardState();
}

class _WallpaperCardState extends State<WallpaperCard> {
  bool _isLiked = false;
  bool _isHovered = false;

  void _handleLike() {
    setState(() {
      _isLiked = !_isLiked;
    });
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        if (widget.onViewToggle != null) {
          widget.onViewToggle!();
        } else if (widget.onTap != null) {
          widget.onTap!();
        }
      },
      onTapDown: (_) => setState(() => _isHovered = true),
      onTapUp: (_) => setState(() => _isHovered = false),
      onTapCancel: () => setState(() => _isHovered = false),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        decoration: BoxDecoration(
          color: Colors.white30,
          borderRadius: BorderRadius.circular(16),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(_isHovered ? 0.1 : 0.05),
              blurRadius: 5,
              offset: const Offset(0, 3),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Image container
            Container(
              height: widget.isGridMode ? 200 : 150,
              decoration: BoxDecoration(
                borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
                image: DecorationImage(
                  image: NetworkImage(widget.wallpaper.url),
                  fit: BoxFit.cover,
                ),
              ),
              alignment: Alignment.center,
              child: const Icon(
                Icons.remove_red_eye,
                color: Colors.white,
                size: 32,
              ),
            ),

            // Content
            Padding(
              padding: const EdgeInsets.all(12.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Title and author
                  Text(
                    widget.wallpaper.title,
                    style: Theme.of(context).textTheme.titleMedium,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      const Icon(Icons.person, size: 16),
                      const SizedBox(width: 4),
                      Text(
                        widget.wallpaper.author,
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  // Category badge
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: Theme.of(context).colorScheme.primary.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      widget.wallpaper.category,
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                        color: Theme.of(context).colorScheme.primary,
                      ),
                    ),
                  ),
                  const SizedBox(height: 12),
                  // Actions
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Row(
                        children: [
                          _buildActionIcon(Icons.download, widget.wallpaper.downloads),
                          const SizedBox(width: 16),
                          _buildActionIcon(Icons.favorite, widget.wallpaper.likes),
                        ],
                      ),
                      IconButton(
                        icon: Icon(_isLiked ? Icons.favorite : Icons.favorite_border),
                        color: _isLiked ? Colors.red : null,
                        onPressed: _handleLike,
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildActionIcon(IconData icon, int count) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(icon, size: 16),
        const SizedBox(width: 4),
        Text(
          count > 999 ? '${(count / 1000).toStringAsFixed(0)}k' : count.toString(),
          style: Theme.of(context).textTheme.bodySmall,
        ),
      ],
    );
  }
}