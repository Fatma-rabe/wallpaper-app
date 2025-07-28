import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/wallpaper.dart';

class ApiService {
  static const String _apiKey = '51519105-fd9634a2d44b0d9dd92122357';
  static const String _baseUrl = 'https://pixabay.com/api/';

  static Future<List<Wallpaper>> fetchWallpapers({String category = 'nature'}) async {
    final response = await http.get(
      Uri.parse('$_baseUrl/search?query=$category&per_page=30'),
      headers: {
        'Authorization': _apiKey,
      },
    );

    if (response.statusCode == 200) {
      final jsonData = json.decode(response.body);
      final List photos = jsonData['photos'];

      return photos.map((photo) {
        return Wallpaper(
          id: photo['id'],
          url: photo['src']['portrait'],
          title: photo['alt'] ?? 'Untitled',
          category: category,
          downloads: 0,
          likes: 0,
          author: photo['photographer'],
          width: photo['width'],
          height: photo['height'],
        );
      }).toList();
    } else {
      throw Exception('Failed to fetch wallpapers');
    }
  }
}