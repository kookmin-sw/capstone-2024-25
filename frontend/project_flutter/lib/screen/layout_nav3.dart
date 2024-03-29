import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class LayoutNav3 extends StatefulWidget {
  const LayoutNav3({super.key});

  @override
  State<LayoutNav3> createState() {
    return _LayoutNav3State();
  }
}

class _LayoutNav3State extends State<LayoutNav3> {
  late final WebViewController _controller;

  @override
  void initState() {
    super.initState();
    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setBackgroundColor(const Color(0x00000000))
      ..setNavigationDelegate(
        NavigationDelegate(
          onProgress: (int progress) {
            // Update loading bar.
          },
          onPageStarted: (String url) {},
          onPageFinished: (String url) {},
          onWebResourceError: (WebResourceError error) {},
          onNavigationRequest: (NavigationRequest request) {
            if (request.url.startsWith('https://www.youtube.com/')) {
              return NavigationDecision.prevent;
            }
            return NavigationDecision.navigate;
          },
        ),
      )
      ..loadRequest(Uri.parse('http://192.168.45.1:3000/ttt'));
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Center(child: WebViewWidget(controller: _controller)),
    );
  }
}
