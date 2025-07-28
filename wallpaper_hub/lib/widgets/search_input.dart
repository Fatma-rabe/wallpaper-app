import 'package:flutter/material.dart';

class SearchInput extends StatelessWidget {
  final Function(String) onChanged;

  const SearchInput({
    super.key,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: TextField(
        decoration: InputDecoration(
          hintText: 'Search wallpapers...',
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          prefixIcon: const Icon(Icons.search),
          filled: true,
          fillColor: Theme.of(context).colorScheme.surfaceVariant,
        ),
        onChanged: onChanged,
        style: Theme.of(context).textTheme.bodyLarge,
      ),
    );
  }
}
