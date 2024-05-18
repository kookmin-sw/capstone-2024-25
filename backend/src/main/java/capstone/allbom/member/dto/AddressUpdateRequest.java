package capstone.allbom.member.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

@Schema(description = "마이페이지 주소 업데이트 요청")
public record AddressUpdateRequest(
        @Schema(description = "주소", example = "서울특별시 성북구 정릉동 77")
        @NotNull(message = "주소는 필수입니다.")
        String address,

        @Schema(description = "상세 주소", example = "국민대학교 4층 자율주행스튜디오")
        @NotNull(message = "주소는 필수입니다.")
        String detailAddress
) {
}
