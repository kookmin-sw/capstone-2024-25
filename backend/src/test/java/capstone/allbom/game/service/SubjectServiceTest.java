package capstone.allbom.game.service;

import capstone.allbom.common.exception.BadRequestException;
import capstone.allbom.common.exception.DefaultErrorCode;
import capstone.allbom.game.domain.*;
import capstone.allbom.game.dto.SentenceRequest;
import capstone.allbom.member.domain.Member;
import capstone.allbom.member.domain.MemberRepository;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
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
        SentenceRequest request = new SentenceRequest(
                "DNA는 생명체의 유전 정보를 담고 있는 분자이다."
        );
        Member member = memberRepository.save(new Member());
        Game game = gameRepository.save(new Game());

//        @BeforeEach
//        void setUp() {
//            science = new Subject(
//                    null,
//                    null,
//                    SubjectType.SCIENCE,
//                    2,
//                    false,
//                    new ArrayList<>()
//            );
//            game.setMember(member);
//            science.setGame(game);
//            subjectRepository.save(science);
//        }

        @BeforeEach
        void setUp() {
            game.setMember(member);
            science = game.getSubjects().get(1);
            science.setCurrProblem(2);
        }

        @Test
        void 문제를_건너뛰면_리스트에_현재_번호가_추가된다() {
            // given
            var science = game.getSubjects().get(1);
            science.setCurrProblem(77);

            // when
            subjectService.plusToPassedProblems(science);
            List<Integer> passedProblems = science.getPassedProblems();

            // then
            assertThat(passedProblems.size()).isEqualTo(1);
            assertThat(passedProblems).contains(77);
        }

        @Test
        void 사용자의_문장_입력과_정답이_같은지_비교한다() {
            // given
            String answer = "태풍은 열대 지방에서 발생하여 강한 바람과 강우를 동반한다.";
            SentenceRequest request = new SentenceRequest(
              "태풍은 열대 지방에서 발생하여 강한 바람과 강우를 동반한다."
            );
            var science = game.getSubjects().get(1);
            science.setCurrProblem(77);

            // when
            boolean isTrue = subjectService.compareWithAnswer(science.getType(), answer, request);

//            // then
            assertThat(isTrue).isTrue();
        }

        @Test
        void 사용자의_문장_입력과_정답이_다른지_비교한다() {
            // given
            String answer = "정치적 분열이 사회의 안정을 위협하고 있다.";
            SentenceRequest request = new SentenceRequest(
                    "정치적 분열이 사회의 안정을 위협하고 있다다."
            );
            var science = game.getSubjects().get(2);
            science.setCurrProblem(84);

            // when
            boolean isFalse = subjectService.compareWithAnswer(science.getType(), answer, request);

//            // then
            assertThat(isFalse).isFalse();
        }

        @Test
        void 과목별로_문장의_총갯수와_건너뛴_문제를_고려하여_현재_문제를_업데이트한다() {
            // when
            subjectService.updateToNextProblem(science);

            // then
            assertThat(science.getCurrProblem()).isEqualTo(3);
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

            // when & then
            subjectService.updateToNextProblem(science);
            assertThat(science.getCurrProblem()).isEqualTo(22);
            subjectService.updateToNextProblem(science);
            assertThat(science.getCurrProblem()).isEqualTo(31);
        }

        @Test
        void 모든_문제를_완료했는데_수정하려_할시_예외가_발생한다() {
            // given
            Subject literature = new Subject(
                    null,
                    null,
                    SubjectType.LITERATURE,
                    100,
                    false,
                    new ArrayList<>() // Arrays.asList()로 생성한 리스트는 크기가 고정되어 있어 수정이 불가능
            );
            literature.getPassedProblems().add(84);
            Subject savedLiterature = subjectRepository.save(literature);

            Subject society = new Subject(
                    null,
                    null,
                    SubjectType.SOCIETY,
                    100,
                    false,
                    new ArrayList<>()
            );
            Subject savedSociety = subjectRepository.save(society);

            // when
            subjectService.updateToNextProblem(literature);
            assertThat(literature.getCurrProblem()).isEqualTo(84);
            BadRequestException e1 = assertThrows(BadRequestException.class, ()
                    -> subjectService.updateToNextProblem(literature));

            BadRequestException e2 = assertThrows(BadRequestException.class, ()
                    -> subjectService.updateToNextProblem(society));

            // then
            Subject updatedLiterature = subjectRepository.findById(literature.getId()).orElseThrow();
            Subject updatedSociety = subjectRepository.findById(savedSociety.getId()).orElseThrow();
            assertThat(updatedLiterature.getCurrProblem()).isEqualTo(84);
            assertThat(updatedSociety.getCurrProblem()).isEqualTo(100);
            assertThat(e1.getErrorCode()).isEqualTo(DefaultErrorCode.COMPLETE_SUBJECT_ALL_PROBLEM);
            assertThat(e2.getErrorCode()).isEqualTo(DefaultErrorCode.COMPLETE_SUBJECT_ALL_PROBLEM);
        }

        @Test
        void 게임_객체를_생성하면_5개의_과목_객체가_생성된다() {
            // given
            Game game = new Game();

            // when
            gameRepository.save(game);
            List<Subject> subjects = game.getSubjects();

            // then
            assertThat(subjects.size()).isEqualTo(5);
            for (Subject subject : subjects) {
                assertThat(subject.getType()).isIn(
                        SubjectType.LITERATURE,
                        SubjectType.SCIENCE,
                        SubjectType.SOCIETY,
                        SubjectType.HISTORY,
                        SubjectType.LEGISLATION
                );
            }
        }
    }
}