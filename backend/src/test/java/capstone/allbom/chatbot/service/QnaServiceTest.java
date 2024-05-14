package capstone.allbom.chatbot.service;

import capstone.allbom.chatbot.domain.AnswerType;
import capstone.allbom.chatbot.domain.Qna;
import capstone.allbom.chatbot.domain.QnaRepository;
import capstone.allbom.chatbot.dto.QnaAndTypeResponse;
import capstone.allbom.member.domain.Member;
import capstone.allbom.member.domain.MemberRepository;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
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

        Qna qna4 = Qna.builder()
                .question("qna4")
                .answer("aaaa")
                .type(AnswerType.GENERAL)
                .createdAt(LocalDateTime.now())
                .build();

        Qna qna5 = Qna.builder()
                .question("qna5")
                .answer("aaaa")
                .type(AnswerType.GENERAL)
                .createdAt(LocalDateTime.now())
                .build();

        Qna qna6 = Qna.builder()
                .question("qna6")
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
            qnaRepository.save(qna4);
            qnaRepository.save(qna5);
            qnaRepository.save(qna6);

            qna1.setMember(member);
            qna2.setMember(member);
            qna3.setMember(member);
            qna4.setMember(member);
            qna5.setMember(member);
            qna6.setMember(member);

            // when
            List<QnaAndTypeResponse> qnaPairs = qnaService.getTopThreeQnas(member);

            // then
            assertEquals(5, qnaPairs.size());
            assertEquals("qna6", qnaPairs.get(0).question());
            assertEquals("qna5", qnaPairs.get(1).question());
            assertEquals("qna4", qnaPairs.get(2).question());
            assertEquals("hiiiii", qnaPairs.get(3).question());
            assertEquals("hello", qnaPairs.get(4).question());
//            assertEquals("hi", qnaPairs.get(2).question());
        }
    }
}