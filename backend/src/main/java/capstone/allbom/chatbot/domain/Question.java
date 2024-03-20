package capstone.allbom.chatbot.domain;

import capstone.allbom.member.domaiin.Member;
import capstone.allbom.routine.domain.Routine;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter @Setter
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "twentyQuestions_id")
    private TwentyQuestions twentyQuestions;

    private String details;

    private LocalDateTime createdAt;
}
