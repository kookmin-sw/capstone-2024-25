package capstone.allbom.game.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
public class Literature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "literature_id")
    private Long id;

    @OneToOne(mappedBy = "literature", cascade = CascadeType.ALL)
    private Game game;

    Integer currProblem;

    private List<Integer> passedProblems = new ArrayList<>();
}
