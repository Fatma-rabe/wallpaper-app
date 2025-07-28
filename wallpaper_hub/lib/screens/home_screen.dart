import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import '../models/wallpaper.dart';
import '../widgets/category_selector.dart';
import '../widgets/search_input.dart';
import 'package:provider/provider.dart';
import '../widgets/wallpaper_grid.dart';
import '../config/api_config.dart';
import '../providers/view_mode_provider.dart';
import '../widgets/wallpaper_modal.dart';


class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List<Wallpaper> _wallpapers = [];
  String _searchQuery = '';
  String _selectedCategory = 'Nature';
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadWallpapers();
  }

  Future<void> _loadWallpapers() async {
    setState(() => _isLoading = true);
    try {
      final wallpapers = await fetchWallpapersFromPixabay(_selectedCategory);
      setState(() {
        _wallpapers = wallpapers;
        _isLoading = false;
      });
    } catch (e) {
      print('Error fetching wallpapers: $e');
      setState(() => _isLoading = false);
    }
  }

  Future<List<Wallpaper>> fetchWallpapersFromPixabay(String category) async {
    final url = Uri.parse('${ApiConfig.pixabayBaseUrl}?key=${ApiConfig.pixabayApiKey}&q=$category&image_type=photo');

    final response = await http.get(url);

    if (response.statusCode == 200) {
      final jsonData = json.decode(response.body);
      final List hits = jsonData['hits'];

      return hits.map((item) {
        return Wallpaper(
          id: item['id'],
          url: item['webformatURL'],
          title: item['tags'] ?? 'Untitled',
          category: category,
          downloads: item['downloads'] ?? 0,
          likes: item['likes'] ?? 0,
          author: item['user'] ?? 'Unknown',
          width: item['imageWidth'],
          height: item['imageHeight'],
        );
      }).toList();
    } else {
      throw Exception('Failed to load wallpapers from Pixabay');
    }
  }

  List<Wallpaper> get _filteredWallpapers {
    return _wallpapers.where((wallpaper) {
      final search = _searchQuery.toLowerCase();
      return wallpaper.title.toLowerCase().contains(search) ||
          wallpaper.author.toLowerCase().contains(search);
    }).toList();
  }

  void _handleSearch(String query) {
    setState(() {
      _searchQuery = query;
    });
  }

  void _handleCategorySelect(String category) {
    setState(() {
      _selectedCategory = category;
    });
    _loadWallpapers();
  }

  @override
  Widget build(BuildContext context) {
    final viewMode = Provider.of<ViewModeProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: const Text('My Wallpapers'),
        actions: [
          IconButton(
            icon: Icon(viewMode.isGridMode ? Icons.grid_view : Icons.view_list),
            onPressed: () {
              viewMode.toggleViewMode();
            },
            tooltip: viewMode.isGridMode ? 'Switch to List View' : 'Switch to Grid View',
          ),
        ],
      ),
      body: Column(
        children: [
          SearchInput(onChanged: _handleSearch),
          CategorySelector(
            selectedCategory: _selectedCategory,
            onCategorySelected: _handleCategorySelect,
          ),
          Expanded(
            child: _isLoading
                ? const Center(child: CircularProgressIndicator())
                : WallpaperGrid(
                    wallpapers: _filteredWallpapers,
                    onWallpaperClick: (wallpaper) {
                      showModalBottomSheet(
                        context: context,
                        isScrollControlled: true,
                        builder: (context) => WallpaperModal(
                          wallpaper: wallpaper,
                          onClose: () => Navigator.pop(context),
                        ),
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }
}