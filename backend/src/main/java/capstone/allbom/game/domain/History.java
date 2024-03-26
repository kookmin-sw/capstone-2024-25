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
public class History {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_id")
    private Long id;

    @OneToOne(mappedBy = "history", cascade = CascadeType.ALL)
    private Game game;

    Integer currProblem;

    private List<Integer> passedProblems = new ArrayList<>();
}
