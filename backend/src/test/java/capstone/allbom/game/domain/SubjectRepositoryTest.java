package capstone.allbom.game.domain;

import capstone.allbom.member.domain.Member;
import capstone.allbom.member.domain.MemberRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class SubjectRepositoryTest {

    @Autowired GameRepository gameRepository;
    @Autowired SubjectRepository subjectRepository;
    @Autowired MemberRepository memberRepository;

    @Test
    void 게임과_과목명으로_조회한다() {
        // given
        Game game =gameRepository.save(new Game());
        Game game2 =gameRepository.save(new Game());

        Subject science = game.getSubjects().get(1);
        Subject society = game.getSubjects().get(2);
        Subject science2 = game2.getSubjects().get(1);
        Subject society2 = game2.getSubjects().get(2);

        subjectRepository.save(science);
        subjectRepository.save(society);
        subjectRepository.save(science2);
        subjectRepository.save(society2);

        // when
        Subject scienceFind = subjectRepository.findByGameAndType(game.getId(), SubjectType.SCIENCE)
                .orElseThrow();
        Subject societyFind = subjectRepository.findByGameAndType(game.getId(), SubjectType.SOCIETY)
                .orElseThrow();
        Subject scienceFind2 = subjectRepository.findByGameAndType(game2.getId(), SubjectType.SCIENCE)
                .orElseThrow();
        Subject societyFind2 = subjectRepository.findByGameAndType(game2.getId(), SubjectType.SOCIETY)
                .orElseThrow();

        // then
        Assertions.assertThat(science.getId()).isEqualTo(scienceFind.getId());
        Assertions.assertThat(society.getId()).isEqualTo(societyFind.getId());
        Assertions.assertThat(science2.getId()).isEqualTo(scienceFind2.getId());
        Assertions.assertThat(society2.getId()).isEqualTo(societyFind2.getId());
    }

    @Test
    void 회원과_과목명으로_조회한다() {
        // given
        Member member = memberRepository.save(new Member());
        Member member2 = memberRepository.save(new Member());

        Game game =gameRepository.save(new Game());
        Game game2 =gameRepository.save(new Game());
        game.setMember(member);
        game2.setMember(member2);

        Subject science = game.getSubjects().get(1);
        Subject society = game.getSubjects().get(2);
        Subject science2 = game2.getSubjects().get(1);
        Subject society2 = game2.getSubjects().get(2);

        subjectRepository.save(science);
        subjectRepository.save(society);
        subjectRepository.save(science2);
        subjectRepository.save(society2);

        System.out.println("game.getMember().getId() = " + game.getMember().getId());
        System.out.println("game2.getMember().getId() = " + game2.getMember().getId());

        // when
        Subject scienceFind = subjectRepository.findByMemberAndType(game.getMember().getId(), SubjectType.SCIENCE)
                .orElseThrow();
        Subject societyFind = subjectRepository.findByMemberAndType(game.getMember().getId(), SubjectType.SOCIETY)
                .orElseThrow();
        Subject scienceFind2 = subjectRepository.findByMemberAndType(game2.getMember().getId(), SubjectType.SCIENCE)
                .orElseThrow();
        Subject societyFind2 = subjectRepository.findByMemberAndType(game2.getMember().getId(), SubjectType.SOCIETY)
                .orElseThrow();

        // then
        Assertions.assertThat(science.getId()).isEqualTo(scienceFind.getId());
        Assertions.assertThat(society.getId()).isEqualTo(societyFind.getId());
        Assertions.assertThat(science2.getId()).isEqualTo(scienceFind2.getId());
        Assertions.assertThat(society2.getId()).isEqualTo(societyFind2.getId());
    }

}