import 'package:flutter/material.dart';

class ImageWithFallback extends StatefulWidget {
  final String imageUrl;
  final String? altText;
  final BoxFit? fit;
  final double? width;
  final double? height;

  const ImageWithFallback({
    Key? key,
    required this.imageUrl,
    this.altText,
    this.fit,
    this.width,
    this.height,
  }) : super(key: key);

  @override
  State<ImageWithFallback> createState() => _ImageWithFallbackState();
}

class _ImageWithFallbackState extends State<ImageWithFallback> {
  bool _hasError = false;

  @override
  Widget build(BuildContext context) {
    if (_hasError) {
      return Container(
        width: widget.width,
        height: widget.height,
        decoration: BoxDecoration(
          color: Theme.of(context).colorScheme.surfaceVariant,
          borderRadius: BorderRadius.circular(8),
        ),
        child: Center(
          child: Icon(
            Icons.error_outline,
            size: 48,
            color: Theme.of(context).colorScheme.onSurfaceVariant,
          ),
        ),
      );
    }

    return Image.network(
      widget.imageUrl,
      fit: widget.fit ?? BoxFit.cover,
      width: widget.width,
      height: widget.height,
      errorBuilder: (context, error, stackTrace) {
        setState(() {
          _hasError = true;
        });
        return Container(
          width: widget.width,
          height: widget.height,
          decoration: BoxDecoration(
            color: Theme.of(context).colorScheme.surfaceVariant,
            borderRadius: BorderRadius.circular(8),
          ),
          child: Center(
            child: Icon(
              Icons.error_outline,
              size: 48,
              color: Theme.of(context).colorScheme.onSurfaceVariant,
            ),
          ),
        );
      },
      loadingBuilder: (context, child, loadingProgress) {
        if (loadingProgress == null) return child;
        return Center(
          child: CircularProgressIndicator(
            value: loadingProgress.expectedTotalBytes != null
                ? loadingProgress.cumulativeBytesLoaded / loadingProgress.expectedTotalBytes!
                : null,
          ),
        );
      },
    );
  }
}
