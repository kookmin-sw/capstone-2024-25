import 'package:flutter/material.dart';
import 'package:project_flutter/widget/header.dart';

class TwentyHeadsIntro extends StatelessWidget {
  const TwentyHeadsIntro({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: SafeArea(
          child: Container(
            decoration: const BoxDecoration(
              color: Colors.white,
            ),
            alignment: Alignment.center,
            child: Column(
              children: [
                HeaderWidget(title: '스무고개', isShowBackButton: true),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
