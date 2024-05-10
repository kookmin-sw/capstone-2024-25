import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';

class LayoutNav5 extends StatefulWidget {
  const LayoutNav5({super.key});

  @override
  State<LayoutNav5> createState() {
    return _LayoutNav5State();
  }
}

class _LayoutNav5State extends State<LayoutNav5> {
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
                    url: WebUri(
                        "https://capstone-test-git-master-kwakheeguns-projects.vercel.app/chatBot")),
                onPermissionRequest: (controller, request) async {
                  return PermissionResponse(
                      resources: request.resources,
                      action: PermissionResponseAction.GRANT);
                },
                initialSettings: InAppWebViewSettings(
                    javaScriptCanOpenWindowsAutomatically: true,
                    useShouldOverrideUrlLoading: true,
                    useOnLoadResource: true,
                    allowsBackForwardNavigationGestures: true),
                onWebViewCreated: (controller) {
                  webViewController = controller;
                },
              ),
            ),
          ])),
    );
  }
}
