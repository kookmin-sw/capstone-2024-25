package capstone.allbom.game.domain;

import capstone.allbom.member.domaiin.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "game_id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne
    @JoinColumn(name = "literature_id")
    private Literature literature;

    @OneToOne
    @JoinColumn(name = "science_id")
    private Science science;

    @OneToOne
    @JoinColumn(name = "society_id")
    private Society society;

    @OneToOne
    @JoinColumn(name = "legislation_id")
    private Legislation legislation;

    @OneToOne
    @JoinColumn(name = "history_id")
    private History history;

    private String dailySentence;
}
