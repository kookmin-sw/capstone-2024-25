package capstone.allbom.facility.dto;

import capstone.allbom.facility.domain.Facility;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Schema(description = "지도 데이터 상세 응답")
@Getter
@RequiredArgsConstructor // 다른 생성자를 위해 사용하므로 유지
@AllArgsConstructor
public class FacilityDetailResponse extends MapDetailResponse{
    @Schema(description = "지도 ID", example = "1")
    private Long id;

    @Schema(description = "지도 데이터 유형", example = "hospital")
    private String type;

    @Schema(description = "시설명", example = "경희평강한의원")
    private String name;

    @Schema(description = "주소", example = "서울특별시 마포구 마포대로11길 46 4층 (공덕동)")
    private String address;

    @Schema(description = "전화번호", example = "027171688")
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
