package capstone.allbom.chatbot.controller;

import capstone.allbom.chatbot.domain.Qna;
import capstone.allbom.chatbot.service.QnaService;
import capstone.allbom.common.jwt.Auth;
import capstone.allbom.game.domain.Subject;
import capstone.allbom.game.domain.SubjectType;
import capstone.allbom.game.dto.SentenceResponse;
import capstone.allbom.member.domain.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chatbot/qna")
@Slf4j
public class QnaController {

    private final QnaService qnaService;
//
//    @GetMapping
//    public ResponseEntity<List<Qna>> getQnas(
//            @Auth final Member member,
//            @RequestParam final String type
//    ) {
//        SubjectType subjectType = SubjectType.valueOf(type.toUpperCase());
//        Subject subject = subjectService.findByMemberAndType(member, subjectType);
//        String sentence = subjectService.getCurrSentence(subjectType, subject.getCurrProblem());
//        re
}
