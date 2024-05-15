package capstone.allbom.chatbot.domain;

import capstone.allbom.member.domain.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class QnaRepositoryTest {

    @Autowired private TwentyQuestionsRepository twentyQuestionsRepository;
    @Autowired private MemberRepository memberRepository;
    @Autowired private  QnaRepository qnaRepository;

}