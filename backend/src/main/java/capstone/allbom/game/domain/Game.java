package capstone.allbom.game.domain;

import capstone.allbom.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@AllArgsConstructor
//@NoArgsConstructor
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "game_id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany (mappedBy = "game", cascade = CascadeType.ALL)
    private List<Subject> subjects = new ArrayList<>();

    private String dailySentence;

    public Game() {
        SubjectType[] types = SubjectType.values();
        for (int i = 0; i < 5; i++) {
            Subject subject = new Subject();
            subject.setType(types[i]);
            subject.setGame(this);
            this.subjects.add(subject);
        }
    }
}
