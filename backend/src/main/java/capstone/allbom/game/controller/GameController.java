package capstone.allbom.game.controller;

import capstone.allbom.common.jwt.Auth;
import capstone.allbom.game.domain.Game;
import capstone.allbom.game.dto.SentenceResponse;
import capstone.allbom.game.dto.SubjectProgressResponse;
import capstone.allbom.game.service.GameService;
import capstone.allbom.member.domain.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/game")
@Slf4j
public class GameController implements GameControllerDocs{

    private final GameService gameService;

    @GetMapping("/progress")
    public ResponseEntity<SubjectProgressResponse> getProgress(
            @Auth final Member member
    ) {
        Game game = gameService.findByMemberId(member);
        Map<String, Integer> subjectProgress = gameService.computeProgress(game);
        return ResponseEntity.ok(SubjectProgressResponse.from(subjectProgress));
    }
}
