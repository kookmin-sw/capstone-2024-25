import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';

class LayoutHome extends StatefulWidget {
  const LayoutHome({super.key});

  @override
  State<LayoutHome> createState() {
    return _LayoutHomeState();
  }
}

class _LayoutHomeState extends State<LayoutHome> {
  final GlobalKey webViewKey = GlobalKey();

  InAppWebViewController? webViewController;

  @override
  Widget build(BuildContext context) {
    return PopScope(
      child: Scaffold(
          body: Column(children: <Widget>[
        Expanded(
          child: InAppWebView(
            key: webViewKey,
            initialUrlRequest: URLRequest(
                url: WebUri("https://allbome-for-vercel.vercel.app")),
            onPermissionRequest: (controller, request) async {
              return PermissionResponse(
                  resources: request.resources,
                  action: PermissionResponseAction.GRANT);
            },
            initialSettings: InAppWebViewSettings(
              javaScriptCanOpenWindowsAutomatically: true,
              useShouldOverrideUrlLoading: true,
              useOnLoadResource: true,
              allowsBackForwardNavigationGestures: true,
              javaScriptEnabled: true,
              domStorageEnabled: true,
            ),
            onWebViewCreated: (controller) {
              webViewController = controller;
            },
          ),
        ),
      ])),
    );
  }
}
