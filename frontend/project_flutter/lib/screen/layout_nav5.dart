import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class LayoutNav5 extends StatefulWidget {
  const LayoutNav5({super.key});

  @override
  State<LayoutNav5> createState() {
    return _LayoutNav5State();
  }
}

class _LayoutNav5State extends State<LayoutNav5> {
  @override
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
      ..loadRequest(Uri.parse('http://192.168.45.175:3000/map'));
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Center(child: WebViewWidget(controller: _controller)),
    );
  }
}
