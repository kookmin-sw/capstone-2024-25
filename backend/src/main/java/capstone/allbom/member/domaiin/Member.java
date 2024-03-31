package capstone.allbom.member.domaiin;

import capstone.allbom.auth.dto.response.KakaoMemberResponse;
import capstone.allbom.medicine.domain.Medicine;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Builder
@Entity
@Getter @Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    private LoginType loginType;

    private String socialId;

    private String loginId;

    private String loginPassword;

    private String name;

//    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthday;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Embedded
    private Address address;

    private String detailAddress;

    private Double longitude;

    private Double latitude;

    private String phoneNumber;

    private String guardianNumber;

    private String profileImageUrl;

    @Builder.Default
    @OneToMany (mappedBy = "member", cascade = CascadeType.ALL)
    private List<Medicine> medicines = new ArrayList<>();

    public static Member from(final KakaoMemberResponse response) {
        return Member.builder()
                .loginType(LoginType.KAKAO)
                .socialId(String.valueOf(response.id()))
                .build();
    }

    public boolean hasEssentialInfo() {
        return (this.gender != null && this.birthday != null);
    }

//    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL)
//    private Routine routine;

}