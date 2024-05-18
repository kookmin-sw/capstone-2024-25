package capstone.allbom.chatbot.domain;

import capstone.allbom.member.domain.Member;
import capstone.allbom.member.domain.MemberRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class TwentyQuestionsRepositoryTest {

    @Autowired private TwentyQuestionsRepository twentyQuestionsRepository;
    @Autowired private MemberRepository memberRepository;


    @Test
    void 현재_진행_중인_스무고개_객체를_리턴한다() {
        // given
        Member member1 = Member.builder()
                .name("memberA")
                .build();
        memberRepository.save(member1);

        Member member2 = Member.builder()
                .name("memberB")
                .build();
        memberRepository.save(member2);

        TwentyQuestions twentyQuestions1 = TwentyQuestions.builder()
                .build();
        twentyQuestionsRepository.save(twentyQuestions1);

        TwentyQuestions twentyQuestions2 = TwentyQuestions.builder()
                .build();
        twentyQuestionsRepository.save(twentyQuestions2);

        TwentyQuestions twentyQuestions3 = TwentyQuestions.builder()
                .build();
        twentyQuestionsRepository.save(twentyQuestions3);

        twentyQuestions1.setMember(member1);
        twentyQuestions2.setMember(member1);
        twentyQuestions3.setMember(member2);

        // when
        twentyQuestions3.setIsComplete(false);
        TwentyQuestions twentyQuestions = twentyQuestionsRepository.findByMemberId(member2.getId()).get();

        // then
        Assertions.assertThat(twentyQuestions).isEqualTo(twentyQuestions3);
    }

    @Test
    void 이미_완료한_스무고개_게임은_조회되지_않는다() {
        // given
        Member member1 = Member.builder()
                .name("memberA")
                .build();
        memberRepository.save(member1);

        Member member2 = Member.builder()
                .name("memberB")
                .build();
        memberRepository.save(member2);

        TwentyQuestions twentyQuestions1 = TwentyQuestions.builder()
                .build();
        twentyQuestionsRepository.save(twentyQuestions1);

        TwentyQuestions twentyQuestions2 = TwentyQuestions.builder()
                .build();
        twentyQuestionsRepository.save(twentyQuestions2);

        TwentyQuestions twentyQuestions3 = TwentyQuestions.builder()
                .build();
        twentyQuestionsRepository.save(twentyQuestions3);

        twentyQuestions1.setMember(member1);
        twentyQuestions2.setMember(member1);
        twentyQuestions3.setMember(member2);

        // when
        twentyQuestions1.setIsComplete(true);
        twentyQuestions2.setIsComplete(false);
        TwentyQuestions twentyQuestions = twentyQuestionsRepository.findByMemberId(member1.getId()).get();

        // then
        Assertions.assertThat(twentyQuestions).isEqualTo(twentyQuestions2);
    }
}