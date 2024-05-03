package capstone.allbom.game.service;

import capstone.allbom.common.exception.BadRequestException;
import capstone.allbom.common.exception.DefaultErrorCode;
import capstone.allbom.common.exception.NotFoundException;
import capstone.allbom.game.domain.Game;
import capstone.allbom.game.domain.GameRepository;
import capstone.allbom.game.domain.Subject;
import capstone.allbom.game.domain.SubjectType;
import capstone.allbom.game.dto.SubjectProgressResponse;
import capstone.allbom.member.domain.Member;
import capstone.allbom.member.domain.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class GameService {

    private final GameRepository gameRepository;
    private final MemberRepository memberRepository;
    private final SubjectService subjectService;

    public Game findByMemberId(final Member member) {
        Member savedMember = memberRepository.findById(member.getId())
                .orElseThrow(() -> new BadRequestException(DefaultErrorCode.NOT_FOUND_MEMBER_ID));

        return gameRepository.findByMemberId(savedMember.getId())
                .orElseGet(() -> createGame(savedMember));
    }

    @Transactional
    public Game createGame(final Member member) {
        final Game game = gameRepository.save(new Game());
        game.setMember(member);
        return game;
    }

    public Map<String, Integer> computeProgress(Game game) {
        List<Subject> subjects = game.getSubjects();

        Map<String, Integer> subjectProgress = new HashMap<>();

        for (Subject subject : subjects) {
            Integer totalSize = subjectService.getSubjectDataSize(subject.getType());

            Integer solvedProblemSize = subject.getCurrProblem() - 1 - subject.getPassedProblems().size();
            log.info("과목별 푼 문제 갯수={}", solvedProblemSize);
            if (solvedProblemSize < 0) {
                throw new BadRequestException(DefaultErrorCode.INVALID_SOLVED_PROBLEMS_SIZE);
            }
            int progress = solvedProblemSize * 100 / totalSize;
            subjectProgress.put(subject.getType().toString().toLowerCase(), progress);
            log.info("과목별 푼 문제 진행률={}", progress);
        }

        return subjectProgress;
    }
}
