package capstone.allbom.member.dto;

import capstone.allbom.member.domain.Member;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Range;

import java.time.LocalDate;
import java.util.List;

public record MemberUpdateRequest(
        @NotNull(message = "이름은 필수입니다.")
        @Range(min = 1, max = 10, message = "이름의 길이를 확인해주세요.")
        String name,
        @NotNull(message = "생년월일은 필수입니다.")
        LocalDate birthday,
        @NotNull(message = "성별은 필수입니다.")
        String gender,
        @NotNull(message = "주소는 필수입니다.")
        String address,
        @NotNull(message = "주소는 필수입니다.")
        String detailAddress,
        @NotNull(message = "전화번호는 필수입니다.")
        String phoneNumber,
        String guardianNumber
) {
}
