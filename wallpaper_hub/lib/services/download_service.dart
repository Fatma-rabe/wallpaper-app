import 'dart:io';
import 'package:path_provider/path_provider.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:http/http.dart' as http;

typedef DownloadCallback = void Function(String message, bool success);

class DownloadService {
  static Future<void> downloadWallpaper(
    String url, 
    String title, 
    DownloadCallback? callback
  ) async {
    try {

      final status = await Permission.storage.request();
      if (status.isGranted) {

        final directory = await getApplicationDocumentsDirectory();
        final fileName = '${title.replaceAll(RegExp(r'[^a-zA-Z0-9]'), '_')}.jpg';
        final filePath = '${directory.path}/wallpapers/$fileName';


        final dir = Directory('${directory.path}/wallpapers');
        if (!await dir.exists()) {
          await dir.create();
        }


        final response = await http.get(Uri.parse(url));
        final file = File(filePath);
        await file.writeAsBytes(response.bodyBytes);


        callback?.call('Downloaded $title successfully!', true);
      } else {

        callback?.call('Storage permission is required to download wallpapers.', false);
      }
    } catch (e) {

      callback?.call('Failed to download wallpaper: ${e.toString()}', false);
    }
  }
}
