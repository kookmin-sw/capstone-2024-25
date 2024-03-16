import 'package:flutter/material.dart';
import 'package:gap/gap.dart';

Widget gamecard(
  String? image,
  Function? onTap, {
  required String title,
  required String description,
}) {
  return Column(children: [
    Expanded(
      child: Container(
        width: double.infinity,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          boxShadow: const [
            BoxShadow(
              color: Color(0xFFABABAB),
              blurRadius: 8,
              offset: Offset(4, 4),
            ),
          ],
        ),
      ),
    ),
    const Gap(12),
    Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        Text(
          description,
          textAlign: TextAlign.right,
        )
      ],
    )
  ]);
}
