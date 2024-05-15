import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';

class LayoutNav2 extends StatefulWidget {
  const LayoutNav2({super.key});

  @override
  State<LayoutNav2> createState() {
    return _LayoutNav2State();
  }
}

class _LayoutNav2State extends State<LayoutNav2> {
  final GlobalKey webViewKey = GlobalKey();

  InAppWebViewController? webViewController;

  @override
  Widget build(BuildContext context) {
    return PopScope(
      child: Scaffold(
          appBar: AppBar(
            title: const Text("InAppWebView test"),
          ),
          body: Column(children: <Widget>[
            Expanded(
              child: InAppWebView(
                key: webViewKey,
                initialUrlRequest: URLRequest(
                    url: WebUri("https://allbome-for-vercel.vercel.app/todo")),
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
