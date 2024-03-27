package capstone.allbom.game.domain;

import capstone.allbom.member.domaiin.Member;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor
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
}
