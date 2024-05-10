package capstone.allbom.chatbot.domain;

import capstone.allbom.auth.dto.request.GeneralSignUpRequest;
import capstone.allbom.chatbot.dto.AnswerResponse;
import capstone.allbom.chatbot.dto.QuestionRequest;
import capstone.allbom.facility.domain.FacilityType;
import capstone.allbom.member.domain.LoginType;
import capstone.allbom.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Qna {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "qna_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "twentyQuestions_id")
    private TwentyQuestions twentyQuestions;

    private LocalDateTime createdAt;

    // question
    private Boolean isGame;


    private String question;

    private Boolean isChatbotFirst;

    // answer
    private AnswerType type;

    private String answer;

    public static Qna from(final QuestionRequest questionRequest, final AnswerResponse answerResponse) {
        return Qna.builder()
                .isGame(questionRequest.isGame())
                .question(questionRequest.question())
                .type(AnswerType.valueOf(answerResponse.type().toUpperCase()))
                .answer(answerResponse.answer())
                .createdAt(LocalDateTime.now())
                .build();
    }
}
