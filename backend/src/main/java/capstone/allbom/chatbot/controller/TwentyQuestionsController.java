package capstone.allbom.chatbot.controller;

import capstone.allbom.chatbot.dto.AnswerResponse;
import capstone.allbom.chatbot.dto.QnaResponse;
import capstone.allbom.chatbot.dto.QuestionRequest;
import capstone.allbom.chatbot.dto.twentyQuestions.TwentyAnswerResponse;
import capstone.allbom.chatbot.dto.twentyQuestions.TwentyQnaResponse;
import capstone.allbom.chatbot.service.QnaService;
import capstone.allbom.chatbot.service.TwentyQuestionsService;
import capstone.allbom.common.jwt.Auth;
import capstone.allbom.member.domain.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chatbot/game")
@Slf4j
public class TwentyQuestionsController {

    private final TwentyQuestionsService twentyQuestionsService;

    @GetMapping
    public ResponseEntity<TwentyQnaResponse> getQnas(
            @Auth final Member member
    ) {
        TwentyQnaResponse twentyQnaResponse = twentyQuestionsService.getAllTwentyQuestionsQnas(member);
        return ResponseEntity.ok(twentyQnaResponse);
    }

    @PostMapping
    public ResponseEntity<TwentyAnswerResponse> requestQuestion(
            @Auth final Member member,
            @RequestBody final QuestionRequest questionRequest
    ) {
        TwentyAnswerResponse twentyAnswerResponse = twentyQuestionsService.requestAnswer(member, questionRequest);
        return ResponseEntity.ok(twentyAnswerResponse);
    }
}
