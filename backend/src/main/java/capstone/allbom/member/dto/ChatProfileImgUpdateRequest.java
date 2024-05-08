package capstone.allbom.member.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

@Schema(description = "챗봇 프로필 이미지 업데이트 요청")
public record ChatProfileImgUpdateRequest(
        @Schema(description = "챗봇 프로필 이미지", example = "BOY, GIRL")
        @NotNull(message = "구분값 요청은 필수입니다.")
        String chatGender
) {
}
