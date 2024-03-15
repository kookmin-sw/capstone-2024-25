import 'package:flutter/material.dart';

class LayoutNav1 extends StatefulWidget {
  const LayoutNav1({super.key});

  @override
  State<LayoutNav1> createState() {
    return _LayoutNav1State();
  }
}

class _LayoutNav1State extends State<LayoutNav1> {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Center(
        child: Text('1'),
      ),
    );
  }
}
