package capstone.allbom.facility.dto;

import capstone.allbom.facility.domain.Facility;
import lombok.*;

@Getter
@RequiredArgsConstructor // 다른 생성자를 위해 사용하므로 유지
@AllArgsConstructor
public class FacilityDetailResponse extends MapDetailResponse{
    private Long id;
    private String type;
    private String name;
    private String address;
    private String phoneNumber;

    public static FacilityDetailResponse from (Facility facility) {
        return new FacilityDetailResponse(
                facility.getId(),
                facility.getType().toString(),
                facility.getName(),
                facility.getAddress(),
                facility.getPhoneNumber()
        );
    }
}
