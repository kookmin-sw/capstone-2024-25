package capstone.allbom.facility.domain;

import jakarta.persistence.*;
import lombok.*;

@Builder
@Entity
@Getter @Setter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Facility {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "facility_id")
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private FacilityType type;

    private String address; // 전체 주소

    private String phoneNumber;

    private Double latitude;

    private Double longitude;

}
