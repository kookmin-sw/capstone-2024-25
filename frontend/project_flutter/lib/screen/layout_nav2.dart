import 'package:flutter/material.dart';

class LayoutNav2 extends StatefulWidget {
  const LayoutNav2({super.key});

  @override
  State<LayoutNav2> createState() {
    return _LayoutNav2State();
  }
}

class _LayoutNav2State extends State<LayoutNav2> {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Center(
        child: Text('2'),
      ),
    );
  }
}
