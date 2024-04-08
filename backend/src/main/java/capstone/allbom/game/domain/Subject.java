package capstone.allbom.game.domain;

import capstone.allbom.common.StringListConverter;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor(access = PROTECTED)
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subject_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    private Game game;

    @Enumerated(EnumType.STRING)
    private SubjectType type;

    Integer currProblem = 1;

    private boolean completeExcludePassed = false; // 건너뛴 문제 제외하고, 나머지 모든 문제들을 완료했는지의 여부

//    @Convert(converter = StringListConverter.class)
    private List<Integer> passedProblems = new ArrayList<>(); // 건너뛴 문제 기록

    public void setGame(Game game) {
        this.game = game;
//        game.getSubjects().add(this);
    }
}
