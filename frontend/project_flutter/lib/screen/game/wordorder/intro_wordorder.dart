import 'package:flutter/material.dart';
import 'package:project_flutter/widget/header.dart';

class WordOrderIntro extends StatelessWidget {
  const WordOrderIntro({super.key});

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
                HeaderWidget(title: '문장 순서 맞추기', isShowBackButton: true),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
