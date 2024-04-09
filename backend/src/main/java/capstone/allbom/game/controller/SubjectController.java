package capstone.allbom.game.controller;

import capstone.allbom.common.jwt.Auth;
import capstone.allbom.game.domain.Subject;
import capstone.allbom.game.domain.SubjectType;
import capstone.allbom.game.dto.SentenceAnswerResponse;
import capstone.allbom.game.dto.SentenceRequest;
import capstone.allbom.game.dto.SentenceResponse;
import capstone.allbom.game.service.SubjectService;
import capstone.allbom.member.domain.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Locale;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/game")
@Slf4j
public class SubjectController {

    private final SubjectService subjectService;

    @GetMapping
    public ResponseEntity<SentenceResponse> getSentence(
            @Auth final Member member,
            @RequestParam final String type
    ) {
        SubjectType subjectType = SubjectType.valueOf(type.toUpperCase());
        Subject subject = subjectService.findByMemberAndType(member, subjectType);
        String sentence = subjectService.getCurrSentence(subjectType, subject.getCurrProblem());
        return ResponseEntity.ok(SentenceResponse.from(subject, sentence));
    }

    @PostMapping("/skip")
    public ResponseEntity<SentenceResponse> skipSentence(
            @Auth final Member member,
            @RequestParam final String type
    ) {
        SubjectType subjectType = SubjectType.valueOf(type.toUpperCase());
        Subject subject = subjectService.findByMemberAndType(member, subjectType);
        subjectService.plusToPassedProblems(subject);
        subjectService.updateToNextProblem(subject);
        String sentence = subjectService.getCurrSentence(subjectType, subject.getCurrProblem());
        return ResponseEntity.ok(SentenceResponse.from(subject, sentence));
    }
}
