package capstone.allbom.chatbot.domain;

import capstone.allbom.game.domain.Subject;
import capstone.allbom.game.domain.SubjectType;
import capstone.allbom.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class TwentyQuestions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "twentyQuestions_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private String solution;

    private Integer questionCount;

    private Boolean isComplete;

    private LocalDateTime createdAt;

    public TwentyQuestions(Member member) {
        this.questionCount = 20;
        this.isComplete = false;
        this.member = member;
        this.createdAt = LocalDateTime.now();
    }
}
