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
public class Legislation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "legislation_id")
    private Long id;

    @OneToOne(mappedBy = "legislation", cascade = CascadeType.ALL)
    private Game game;

    Integer currProblem;

    private List<Integer> passedProblems = new ArrayList<>();
}
