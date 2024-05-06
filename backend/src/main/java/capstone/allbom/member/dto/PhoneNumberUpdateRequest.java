package capstone.allbom.member.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

@Schema(description = "마이페이지 전화번호 업데이트 요청")
public record PhoneNumberUpdateRequest(
        @Schema(description = "전화번호", example = "01012345678")
        @NotNull(message = "전화번호는 필수입니다.")
        String phoneNumber
) {
}
