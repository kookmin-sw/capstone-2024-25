package capstone.allbom.Facility.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
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
