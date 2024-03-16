import 'package:flutter/material.dart';

Widget headerWidget(
    {required String title,
    required Alignment itemAlignment,
    required bool isShowBackButton}) {
  return Container(
    padding: const EdgeInsets.all(20),
    alignment: itemAlignment,
    child: Row(
      children: [
        if (isShowBackButton)
          IconButton(
            icon: const Icon(Icons.arrow_back_ios),
            onPressed: () {
              print('Back button is clicked');
            },
          ),
        Text(
          title,
          style: const TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
      ],
    ),
  );
}
