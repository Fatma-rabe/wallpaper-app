import 'package:flutter/material.dart';
import 'dart:async';

class SplashScreen extends StatefulWidget {
  final Widget Function() onComplete;

  const SplashScreen({Key? key, required this.onComplete}) : super(key: key);

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _fadeAnimation;
  late Animation<double> _scaleAnimation;
  double _progress = 0.0;

  @override
  void initState() {
    super.initState();

    _controller = AnimationController(
      duration: const Duration(seconds: 3),
      vsync: this,
    );

    _fadeAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );

    _scaleAnimation = Tween<double>(begin: 0.8, end: 1.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeOut),
    );

    _controller.forward().then((_) {
      if (mounted) {
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(builder: (_) => widget.onComplete()),
        );
      }
    });

    _startProgressAnimation();
  }

  void _startProgressAnimation() {
    const duration = Duration(seconds: 3);
    const interval = Duration(milliseconds: 50);
    final steps = duration.inMilliseconds / interval.inMilliseconds;
    final increment = 1.0 / steps;

    Timer.periodic(interval, (timer) {
      if (!mounted || _progress >= 1.0) {
        timer.cancel();
        return;
      }
      setState(() {
        _progress += increment;
      });
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: AnimatedBuilder(
        animation: _controller,
        builder: (context, child) {
          return Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                colors: [
                  Color(0xFFE3F2FD), // Light blue
                  Color(0xFFF3E5F5), // Light purple-pink
                ],
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
              ),
            ),
            child: Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // Animated logo
                  ScaleTransition(
                    scale: _scaleAnimation,
                    child: FadeTransition(
                      opacity: _fadeAnimation,
                      child: const Text(
                        'WallpaperHub',
                        style: TextStyle(
                          fontSize: 36,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF303F9F),
                          shadows: [
                            Shadow(
                              offset: Offset(2, 2),
                              blurRadius: 5,
                              color: Colors.black12,
                            )
                          ],
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 32),
                  // Progress bar
                  SizedBox(
                    width: 200,
                    child: LinearProgressIndicator(
                      value: _progress,
                      backgroundColor: Colors.grey[300],
                      valueColor: const AlwaysStoppedAnimation<Color>(
                        Color(0xFF2196F3),
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  // Loading text
                  FadeTransition(
                    opacity: _fadeAnimation,
                    child: const Text(
                      'Loading amazing wallpapers...',
                      style: TextStyle(
                        fontSize: 16,
                        color: Color(0xFF616161),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}