import 'package:flutter/material.dart';

class CategorySelector extends StatelessWidget {
  final String selectedCategory;
  final Function(String) onCategorySelected;
  final List<String> categories = [
    'Nature',
    'Technology',
    'Abstract',
    'Animals',
    'Business',
    'Education',
    'Food',
    'Healthcare',
    'Music',
    'Sports',
  ];

   CategorySelector({
    super.key,
    required this.selectedCategory,
    required this.onCategorySelected,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Row(
          children: categories.map((category) {
            final isSelected = category == selectedCategory;
            return Padding(
              padding: const EdgeInsets.only(right: 8.0),
              child: FilterChip(
                label: Text(category),
                selected: isSelected,
                onSelected: (bool selected) {
                  if (selected) {
                    onCategorySelected(category);
                  }
                },
                selectedColor: Theme.of(context).colorScheme.primary,
                labelStyle: TextStyle(
                  color: isSelected
                      ? Theme.of(context).colorScheme.onPrimary
                      : Theme.of(context).colorScheme.onSurface,
                ),
              ),
            );
          }).toList(),
        ),
      ),
    );
  }
}
