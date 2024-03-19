import 'package:flutter/material.dart';
import 'package:gap/gap.dart';

Widget GameCard({
  required String thumbnail,
  required Function() onTap,
  required String title,
  required String description,
}) {
  return InkResponse(
    onTap: () => onTap(),
    child: Row(children: [
      Expanded(
        flex: 2,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            Text(
              description,
              // textAlign: TextAlign.right,
            )
          ],
        ),
      ),
      const Gap(12),
      Expanded(
        flex: 3,
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
    ]),
  );
}
