import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:project_flutter/screen/layout_login.dart';
import 'package:project_flutter/screen/layout_nav1.dart';
import 'package:project_flutter/screen/layout_nav2.dart';
import 'package:project_flutter/screen/layout_nav3.dart';
import 'package:project_flutter/screen/layout_nav4.dart';
import 'package:project_flutter/screen/layout_nav5.dart';

class AllBome extends StatefulWidget {
  const AllBome({super.key});

  @override
  State<AllBome> createState() => _AllBomeState();
}

class _AllBomeState extends State<AllBome> {
  int currentPageIndex = 0;

  @override
  Widget build(BuildContext context) {
    // final ThemeData theme = Theme.of(context);
    SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
        statusBarColor: Colors.transparent, // 상태 표시줄을 투명하게 설정
        statusBarIconBrightness: Brightness.dark));

    return MaterialApp(
      home: Scaffold(
          bottomNavigationBar: NavigationBar(
            onDestinationSelected: (int index) {
              setState(() {
                currentPageIndex = index;
              });
            },
            height: 60.0,
            // elevation: 0.5,
            // shadowColor: Colors.black,
            labelBehavior: NavigationDestinationLabelBehavior.alwaysHide,
            // indicatorColor: const Color(0xFF379237),
            selectedIndex: currentPageIndex,
            destinations: const <Widget>[
              NavigationDestination(
                icon: Icon(Icons.home),
                label: '0',
              ),
              NavigationDestination(
                // selectedIcon: Icon(Icons.sports_esports_rounded),
                icon: Icon(Icons.sports_esports_rounded),
                label: '1',
              ),
              NavigationDestination(
                // selectedIcon: Icon(Icons.work),
                icon: Icon(Icons.work),
                label: '2',
              ),
              NavigationDestination(
                icon: Icon(Icons.local_florist_rounded),
                label: '3',
              ),
              NavigationDestination(
                icon: Badge(
                  child: Icon(Icons.alarm_rounded),
                ),
                label: '4',
              ),
              NavigationDestination(
                icon: Icon(Icons.map_outlined),
                label: '5',
              ),
            ],
          ),
          body: SafeArea(
            child: <Widget>[
              const LayoutHome(),
              const LayoutNav1(),
              const LayoutNav2(),
              const LayoutNav3(),
              const LayoutNav4(),
              const LayoutNav5(),
            ][currentPageIndex],
          )),
    );
  }
}
