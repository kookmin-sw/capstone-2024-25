package capstone.allbom.game.service;

import capstone.allbom.game.domain.*;
import capstone.allbom.game.dto.GameSentenceRequest;
import capstone.allbom.member.domain.Member;
import capstone.allbom.member.domain.MemberRepository;
import jakarta.persistence.EntityManager;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class SubjectServiceTest {

    @Autowired EntityManager entityManager;
    @Autowired SubjectService subjectService;
    @Autowired SubjectRepository subjectRepository;
    @Autowired MemberRepository memberRepository;
    @Autowired GameRepository gameRepository;

    @Nested
    class updateSubject {
        Subject science;
        GameSentenceRequest request = new GameSentenceRequest(
                "DNA는 생명체의 유전 정보를 담고 있는 분자이다."
        );
        Member member = memberRepository.save(new Member());
        Game game = gameRepository.save(new Game());

        @BeforeEach
        void setUp() {
            science = new Subject(
                    null,
                    null,
                    SubjectType.SCIENCE,
                    2,
                    false,
                    new ArrayList<>()
            );
            game.setMember(member);
            science.setGame(game);
            subjectRepository.save(science);
        }

        @Test
        void 과목별로_문장의_총갯수와_건너뛴_문제를_고려하여_현재_문제를_업데이트한다() {
            // when
            subjectService.updateToNextProblem(science);

            // then
            Assertions.assertThat(science.getCurrProblem()).isEqualTo(3);
        }

        @Test
        void 현재_문제가_해당_교과목의_마지막_문제이면_건너뛴_문제로_되돌아간다() {
            // given
            var science = new Subject(
                    null,
                    null,
                    SubjectType.SCIENCE,
                    100,
                    false,
                    new ArrayList<>() // Arrays.asList()로 생성한 리스트는 크기가 고정되어 있어 수정이 불가능
            );
            science.getPassedProblems().add(22);
            science.getPassedProblems().add(31);

            // when
            subjectService.updateToNextProblem(science);

            // then
            Assertions.assertThat(science.getCurrProblem()).isEqualTo(22);
        }
    }

}