package capstone.allbom.chatbot.controller;

import capstone.allbom.chatbot.domain.Qna;
import capstone.allbom.chatbot.dto.AnswerResponse;
import capstone.allbom.chatbot.dto.QnaResponse;
import capstone.allbom.chatbot.dto.QuestionRequest;
import capstone.allbom.chatbot.service.QnaService;
import capstone.allbom.common.jwt.Auth;
import capstone.allbom.game.domain.Subject;
import capstone.allbom.game.domain.SubjectType;
import capstone.allbom.game.dto.SentenceResponse;
import capstone.allbom.member.domain.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chatbot")
@Slf4j
public class QnaController {

    private final QnaService qnaService;

    @GetMapping
    public ResponseEntity<QnaResponse> getQnas(
            @Auth final Member member,
            Pageable pageable
    ) {
        QnaResponse qnaResponse = qnaService.getFifteenQnasByPagination(member, pageable);
        return ResponseEntity.ok(qnaResponse);
    }

//    @PostMapping
//    public ResponseEntity<AnswerResponse> requestQuestion(
//            @Auth final Member member,
//            @RequestBody final QuestionRequest questionRequest
//    ) {
//
//    }

}
