import 'package:flutter/material.dart';

class ViewModeProvider extends ChangeNotifier {
  bool _isGridMode = true;

  bool get isGridMode => _isGridMode;

  void toggleViewMode() {
    _isGridMode = !_isGridMode;
    notifyListeners();
  }
}
