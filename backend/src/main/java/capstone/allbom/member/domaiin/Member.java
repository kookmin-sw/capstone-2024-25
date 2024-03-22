package capstone.allbom.member.domaiin;

import capstone.allbom.medicine.domain.Medicine;
import capstone.allbom.routine.domain.Routine;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Builder
@Entity
@Getter @Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    private String kakaoEmail;

    private String loginId;

    private String loginPassword;

    private String name;

//    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthday;

    @Enumerated(EnumType.STRING)
    private gender gender;

    @Embedded
    private Address address;

    private String detailAddress;

    private Double longitude;

    private Double latitude;

    private String phoneNumber;

    private String guardianNumber;

    private String profileImageUrl;

    @OneToMany (mappedBy = "member", cascade = CascadeType.ALL)
    private List<Medicine> medicines = new ArrayList<>();

    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL)
    private Routine routine;

}