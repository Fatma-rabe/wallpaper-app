class Wallpaper {
  final int id;
  final String url;
  final String title;
  final String category;
  final int downloads;
  final int likes;
  final String author;
  final int width;
  final int height;

  Wallpaper({
    required this.id,
    required this.url,
    required this.title,
    required this.category,
    required this.downloads,
    required this.likes,
    required this.author,
    required this.width,
    required this.height,
  });

  factory Wallpaper.fromJson(Map<String, dynamic> json) {
    return Wallpaper(
      id: json['id'],
      url: json['url'],
      title: json['title'],
      category: json['category'],
      downloads: json['downloads'],
      likes: json['likes'],
      author: json['author'],
      width: json['width'],
      height: json['height'],
    );
  }
}
