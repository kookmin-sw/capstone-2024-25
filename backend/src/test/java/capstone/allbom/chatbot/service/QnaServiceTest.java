package capstone.allbom.chatbot.service;

import capstone.allbom.chatbot.domain.Qna;
import capstone.allbom.chatbot.domain.QnaRepository;
import capstone.allbom.job.domain.Job;
import capstone.allbom.job.domain.Province;
import capstone.allbom.member.domain.Member;
import capstone.allbom.member.domain.MemberRepository;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class QnaServiceTest {

    @Autowired QnaService qnaService;
    @Autowired QnaRepository qnaRepository;
    @Autowired MemberRepository memberRepository;


    @Nested
    class QnaQueryTest {
        // given
        Member member = Member.builder() // 건대입구
                .build();

        Qna qna1 = Qna.builder()
                .question("hi")
                .answer("aaaa")
                .build();

        Qna qna2 = Qna.builder()
                .question("hello")
                .answer("aaaa")
                .build();

        Qna qna3 = Qna.builder()
                .question("hiiiii")
                .answer("aaaa")
                .build();


        @Test
        public void 시간_역순으로_상위_5개의_채팅_내역을_조회한다() {
            // given
            memberRepository.save(member);
            qnaRepository.save(qna1);
            qnaRepository.save(qna2);
            qnaRepository.save(qna3);

            // when
            List<Qna> qnas = qnaService.getTopFiveQnas(member);
            System.out.println("qnas = " + qnas);

            for (Qna qna : qnas) {
                System.out.println("qna.getQuestion() = " + qna.getQuestion());
            }
        }
    }

}