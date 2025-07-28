import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../models/wallpaper.dart';
import 'image_with_fallback.dart';
import '../services/download_service.dart';

class WallpaperModal extends StatefulWidget {
  final Wallpaper wallpaper;
  final VoidCallback onClose;

  const WallpaperModal({
    Key? key,
    required this.wallpaper,
    required this.onClose,
  }) : super(key: key);

  @override
  State<WallpaperModal> createState() => _WallpaperModalState();
}

class _WallpaperModalState extends State<WallpaperModal> {
  bool _isLiked = false;
  String _selectedDevice = 'mobile';
  bool _showDetails = false;

  void _handleLike() => setState(() => _isLiked = !_isLiked);

  void _handleDownload() {
    DownloadService.downloadWallpaper(
      widget.wallpaper.url,
      widget.wallpaper.title,
          (message, success) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(message),
            backgroundColor: success ? Colors.green : Colors.red,
          ),
        );
      },
    );
  }

  void _handleShare() {
    // TODO: Implement share logic
    print('Sharing: ${widget.wallpaper.title}');
  }

  @override
  Widget build(BuildContext context) {
    return BackdropFilter(
      filter: ImageFilter.blur(sigmaX: 2, sigmaY: 2),
      child: Material(
        color: Colors.transparent,
        child: Stack(
          children: [
            // Background overlay
            Positioned.fill(
              child: GestureDetector(
                onTap: widget.onClose,
                child: Container(
                  color: Colors.black.withOpacity(0.5),
                ),
              ),
            ),

            // Modal Content
            Center(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(20),
                child: Container(
                  decoration: BoxDecoration(
                    color: Theme.of(context).colorScheme.surface,
                    borderRadius: BorderRadius.circular(20),
                    boxShadow: [
                      BoxShadow(
                        color: Theme.of(context).colorScheme.shadow.withOpacity(0.2),
                        blurRadius: 20,
                        offset: const Offset(0, 10),
                      ),
                    ],
                  ),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      // Header
                      Padding(
                        padding: const EdgeInsets.all(16),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Expanded(
                              child: Text(
                                widget.wallpaper.title,
                                style: Theme.of(context).textTheme.titleLarge,
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                            IconButton(
                              icon: const Icon(Icons.close),
                              onPressed: widget.onClose,
                            ),
                          ],
                        ),
                      ),
                      const Divider(),

                      // Image
                      ClipRRect(
                        borderRadius: BorderRadius.circular(12),
                        child: ImageWithFallback(
                          imageUrl: widget.wallpaper.url,
                          width: double.infinity,
                          height: 300,
                          fit: BoxFit.cover,
                        ),
                      ),

                      // Actions & Details
                      Padding(
                        padding: const EdgeInsets.all(16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            // Top Actions
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Row(
                                  children: [
                                    IconButton(
                                      icon: Icon(
                                        _isLiked ? Icons.favorite : Icons.favorite_border,
                                        color: _isLiked ? Colors.red : null,
                                      ),
                                      onPressed: _handleLike,
                                    ),
                                    IconButton(
                                      icon: const Icon(Icons.download),
                                      onPressed: _handleDownload,
                                    ),
                                    IconButton(
                                      icon: const Icon(Icons.share),
                                      onPressed: _handleShare,
                                    ),
                                  ],
                                ),
                                IconButton(
                                  icon: const Icon(Icons.more_vert),
                                  onPressed: () {},
                                ),
                              ],
                            ),

                            const SizedBox(height: 16),

                            // Device Preview
                            Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                _buildDevicePreview('mobile', Icons.smartphone),
                                const SizedBox(width: 12),
                                _buildDevicePreview('tablet', Icons.tablet),
                                const SizedBox(width: 12),
                                _buildDevicePreview('desktop', Icons.desktop_windows),
                              ],
                            ),

                            const SizedBox(height: 16),

                            // Details Toggle
                            GestureDetector(
                              onTap: () => setState(() => _showDetails = !_showDetails),
                              child: Row(
                                children: [
                                  Icon(
                                    _showDetails ? Icons.expand_less : Icons.expand_more,
                                    size: 20,
                                  ),
                                  const SizedBox(width: 8),
                                  Text(
                                    _showDetails ? 'Hide Details' : 'Show Details',
                                    style: Theme.of(context).textTheme.bodyMedium,
                                  ),
                                ],
                              ),
                            ),

                            // Details Content
                            if (_showDetails)
                              Padding(
                                padding: const EdgeInsets.symmetric(vertical: 16),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      'Dimensions: ${widget.wallpaper.width} x ${widget.wallpaper.height}',
                                      style: Theme.of(context).textTheme.bodyMedium,
                                    ),
                                    const SizedBox(height: 8),
                                    Text(
                                      'Category: ${widget.wallpaper.category}',
                                      style: Theme.of(context).textTheme.bodyMedium,
                                    ),
                                    const SizedBox(height: 8),
                                    Text(
                                      'Author: ${widget.wallpaper.author}',
                                      style: Theme.of(context).textTheme.bodyMedium,
                                    ),
                                  ],
                                ),
                              ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    )
        .animate(onPlay: (controller) => controller.forward())
        .scale(
      begin: const Offset(0.9, 0.9),
      end: const Offset(1.0, 1.0),
    );
  }

  Widget _buildDevicePreview(String device, IconData icon) {
    return Column(
      children: [
        IconButton(
          icon: Icon(icon),
          onPressed: () => setState(() => _selectedDevice = device),
          color: _selectedDevice == device
              ? Theme.of(context).colorScheme.primary
              : null,
        ),
        const SizedBox(height: 4),
        Text(
          device,
          style: Theme.of(context).textTheme.bodySmall?.copyWith(
            color: _selectedDevice == device
                ? Theme.of(context).colorScheme.primary
                : null,
          ),
        ),
      ],
    );
  }
}