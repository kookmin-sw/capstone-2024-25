package capstone.allbom.chatbot.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Qna {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "qna_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chatbot_id")
    private Chatbot chatbot;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "twentyQuestions_id")
    private TwentyQuestions twentyQuestions;

    private String question;

    private String answer;

    private LocalDateTime createdAt;

    // question
    private Boolean isChatbotFirst;

    private Boolean isGame;

    // answer
    private String type;
}
