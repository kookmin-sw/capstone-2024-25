import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:project_flutter/allbome.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Permission.microphone.request();
  await Permission.location.request();

  if (!kIsWeb && defaultTargetPlatform == TargetPlatform.android) {
    await InAppWebViewController.setWebContentsDebuggingEnabled(kDebugMode);
  }
  // SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
  //   statusBarColor: Color.fromARGB(0, 255, 255, 255),
  //   systemNavigationBarIconBrightness: Brightness.dark,
  // ));
  // SystemChrome.setSystemUIOverlayStyle(SystemUiOverlayStyle.dark);
  runApp(const MaterialApp(home: AllBome()));
}
