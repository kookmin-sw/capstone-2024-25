package capstone.allbom.member.dto;

import capstone.allbom.member.domain.Member;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Range;

import java.time.LocalDate;
import java.util.List;

@Schema(description = "추가 회원 정보 업데이트 요청")
public record MemberUpdateRequest(
        @Schema(description = "이름", example = "이은선")
        @NotNull(message = "이름은 필수입니다.")
        @Range(min = 1, max = 10, message = "이름의 길이를 확인해주세요.")
        String name,

        @Schema(description = "생년월일", example = "2024-02-22")
        @NotNull(message = "생년월일은 필수입니다.")
        LocalDate birthday,

        @Schema(description = "성별", example = "FEMALE")
        @NotNull(message = "성별은 필수입니다.")
        String gender,

        @Schema(description = "주소", example = "서울특별시 성북구 정릉동 77")
        @NotNull(message = "주소는 필수입니다.")
        String address,

        @Schema(description = "상세 주소", example = "국민대학교 4층 자율주행스튜디오")
        @NotNull(message = "주소는 필수입니다.")
        String detailAddress,

        @Schema(description = "전화번호", example = "01012345678")
        @NotNull(message = "전화번호는 필수입니다.")
        String phoneNumber,

        @Schema(description = "보호자 전화번호", example = "01056781234")
        String guardianNumber
) {
}
