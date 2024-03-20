package capstone.allbom.medicine.domain;

import capstone.allbom.common.StringListConverter;
import capstone.allbom.member.domaiin.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter @Setter
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Medicine {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "medicine_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private String medicineName;

    @Convert(converter = StringListConverter.class)
    private List<String> medicineTime;

     public void setMember(Member member) {
         this.member = member;
         member.getMedicines().add(this);
     }

}
