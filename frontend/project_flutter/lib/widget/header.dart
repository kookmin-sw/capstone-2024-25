import 'package:flutter/material.dart';

Widget HeaderWidget(
    {String? title, Alignment? itemAlignment, bool? isShowBackButton}) {
  return Container(
    padding: const EdgeInsets.all(20),
    alignment: itemAlignment,
    child: Row(
      children: [
        if (isShowBackButton == true)
          IconButton(
            icon: const Icon(Icons.arrow_back_ios),
            onPressed: () {
              print('Back button is clicked');
            },
          ),
        if (title != null)
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
