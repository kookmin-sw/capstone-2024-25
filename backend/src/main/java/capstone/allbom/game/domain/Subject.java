package capstone.allbom.game.domain;

import capstone.allbom.Facility.domain.FacilityType;
import capstone.allbom.member.domaiin.Member;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
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

    Integer currProblem;

    private List<Integer> passedProblems = new ArrayList<>(); // 건너뛴 문제 기록

    public void setGame(Game game) {
        this.game = game;
        game.getSubjects().add(this);
    }
}
