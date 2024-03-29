import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:gap/gap.dart';
import 'package:project_flutter/screen/game/crossword/intro_crossword.dart';
import 'package:project_flutter/screen/game/twentyheads/intro_twentyheads.dart';
import 'package:project_flutter/screen/game/wordorder/intro_wordorder.dart';
import 'package:project_flutter/widget/gamecard.dart';
import 'package:project_flutter/widget/header.dart';

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
        alignment: Alignment.center,
        child: Column(
          children: [
            HeaderWidget(title: '두뇌 향상 게임', isShowBackButton: false),
            const Divider(
              color: Color(0xFFABABAB),
              height: 0,
              thickness: 1,
              indent: 20,
              endIndent: 20,
            ),
            Expanded(
              child: Container(
                padding: const EdgeInsets.all(20),
                child: Column(
                  children: [
                    SvgPicture.asset(
                      'assets/bulb.svg',
                      semanticsLabel: 'Acme Logo',
                    ),
                    const Gap(20),
                    Container(
                      padding: const EdgeInsets.only(left: 10, right: 10),
                      child: const Text(
                          '치매예방 게임을 하시면 두뇌 향상에 많이 도움이 됩니다 믿으시고 하루에 10개씩 하십시오'),
                    ),
                    const Gap(20),
                    Expanded(
                      child: GameCard(
                        thumbnail: 'assets/wordgame.png',
                        onTap: () => Navigator.of(context)
                            .push(_createRoute(WordOrderIntro())),
                        title: '문장 순서 맞히기',
                        description: '단어를 순서대로 배열하여\n문장을 완성하세요',
                      ),
                    ),
                    const Gap(30),
                    Expanded(
                      child: GameCard(
                        thumbnail: 'assets/wordgame.png',
                        onTap: () => Navigator.of(context)
                            .push(_createRoute(CrossWordIntro())),
                        title: '십자말풀이',
                        description: '빈칸의 단어를 맞혀\n격자를 완성하세요',
                      ),
                    ),
                    const Gap(30),
                    Expanded(
                      child: GameCard(
                        thumbnail: 'assets/wordgame.png',
                        onTap: () => Navigator.of(context)
                            .push(_createRoute(TwentyHeadsIntro())),
                        title: '스무고개',
                        description: '20개의 질문 만으로 AI가\n생각한 단어를 맞혀보세요',
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ));
  }
}

Route _createRoute(Widget gameIntroWidget) {
  return PageRouteBuilder(
    pageBuilder: (context, animation, secondaryAnimation) => gameIntroWidget,
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      const begin = Offset(0.0, 1.0);
      const end = Offset.zero;
      const curve = Curves.ease;

      var tween = Tween(begin: begin, end: end).chain(CurveTween(curve: curve));

      return SlideTransition(
        position: animation.drive(tween),
        child: child,
      );
    },
  );
}
