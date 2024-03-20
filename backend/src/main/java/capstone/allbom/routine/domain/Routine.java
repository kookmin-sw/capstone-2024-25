package capstone.allbom.routine.domain;

import capstone.allbom.member.domaiin.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Routine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "routine_id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private String dailyExercise;

    private String dailyGrowth;

    private String dailyHobby;

    private String dailySnack;

    private String dailyFruit;

    private String dailyEat;

    private String dailyRest;

    private Boolean dailyExerciseStatus;

    private Boolean dailyGrowthStatus;

    private Boolean dailyHobbyStatus;

    private Boolean dailyEatStatus;

    private Boolean dailyRestStatus;

    public void setMember(Member member){
        this.member = member;
        member.setRoutine(this);
    }
}
