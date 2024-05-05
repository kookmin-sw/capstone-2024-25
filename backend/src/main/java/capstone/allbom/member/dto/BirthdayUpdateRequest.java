package capstone.allbom.member.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

@Schema(description = "마이페이지 생년월일 업데이트 요청")
public record BirthdayUpdateRequest(
        @Schema(description = "생년월일", example = "2001-02-22")
        @NotNull(message = "생년월일은 필수입니다.")
        LocalDate birthday
) {
}
