package capstone.allbom.chatbot.service;

import capstone.allbom.chatbot.domain.AnswerType;
import capstone.allbom.chatbot.domain.Qna;
import capstone.allbom.chatbot.domain.QnaRepository;
import capstone.allbom.chatbot.dto.QnaAndTypeResponse;
import capstone.allbom.chatbot.dto.QnaPair;
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
import java.time.LocalDateTime;
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
                .type(AnswerType.GENERAL)
                .createdAt(LocalDateTime.now())
                .build();

        Qna qna2 = Qna.builder()
                .question("hello")
                .answer("aaaa")
                .type(AnswerType.GENERAL)
                .createdAt(LocalDateTime.now())
                .build();

        Qna qna3 = Qna.builder()
                .question("hiiiii")
                .answer("aaaa")
                .type(AnswerType.GENERAL)
                .createdAt(LocalDateTime.now())
                .build();


        @Test
        public void 시간_역순으로_상위_5개의_채팅_내역을_조회한다() {
            // given
            memberRepository.save(member);
            qnaRepository.save(qna1);
            qnaRepository.save(qna2);
            qnaRepository.save(qna3);

            qna1.setMember(member);
            qna2.setMember(member);
            qna3.setMember(member);

            // when
            List<QnaAndTypeResponse> qnaPairs = qnaService.getTopFiveQnas(member);

            // then
            assertEquals(3, qnaPairs.size());
            assertEquals("hiiiii", qnaPairs.get(0).question());
            assertEquals("hello", qnaPairs.get(1).question());
            assertEquals("hi", qnaPairs.get(2).question());
        }
    }

}