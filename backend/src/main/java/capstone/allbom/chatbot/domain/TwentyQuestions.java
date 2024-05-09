package capstone.allbom.chatbot.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TwentyQuestions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "twentyQuestions_id")
    private Long id;

    // private Member memberId;

    private String solution;

    private Integer questionCount;

//    private Boolean isComplete;
}
