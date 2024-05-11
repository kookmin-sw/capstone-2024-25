package capstone.allbom.chatbot.controller;

import capstone.allbom.chatbot.dto.QnaResponse;
import capstone.allbom.chatbot.service.QnaService;
import capstone.allbom.common.jwt.Auth;
import capstone.allbom.member.domain.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chatbot/game")
@Slf4j
public class TwentyQuestionsController {

    private final QnaService qnaService;

    @GetMapping
    public ResponseEntity<QnaResponse> getQnas(
            @Auth final Member member,
            Pageable pageable
    ) {
        QnaResponse qnaResponse = qnaService.getFifteenQnasByPagination(member, pageable);
        return ResponseEntity.ok(qnaResponse);
    }
}
