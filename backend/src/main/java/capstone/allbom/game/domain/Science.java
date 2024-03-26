package capstone.allbom.game.domain;

import capstone.allbom.medicine.domain.Medicine;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
public class Science {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "science_id")
    private Long id;

    @OneToOne(mappedBy = "science", cascade = CascadeType.ALL)
    private Game game;

    Integer currProblem;

    private List<Integer> passedProblems = new ArrayList<>();
}
