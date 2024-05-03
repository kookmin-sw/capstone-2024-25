import 'package:flutter/material.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:project_flutter/allbome.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Permission.camera.request();
  await Permission.microphone.request();
  await Permission.location.request();
  runApp(const AllBome());
}
