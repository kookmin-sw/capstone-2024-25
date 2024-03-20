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

    @OneToOne(mappedBy = "game")
    private Member member;

    /**
     * TODO
     * 문장 순서 맞추기 카테고리 정해지면 각 카테고리별로 연관관계 추가 매핑 필요
     */

    private String dailySentence;
}
